import path from "path";
import * as vscode from "vscode";
import {
  Metadata,
  MetadataText,
  MetadataType,
  MetadataUrlFilesProcessingPolicy,
} from "../../component/metadata/metadata";
import { MetadataService } from "../../component/metadata/metadata.service";
import {
  MetadataValidationItem,
  MetadataValidationType,
} from "../../component/metadata/metadata.validation";
import { TranslationType } from "../../component/translation/translation";
import { TranslationService } from "../../component/translation/translation.service";
import { Dialog } from "../../util/dialog";
import { Toast } from "../../util/toast";
import { Cmd } from "../cmd";
import { MetadataCreateCmdArgs } from "./metadata.create.cmd";

interface InitParams {
  metadataService: MetadataService;
  translationService: TranslationService;
}

export class MetadataTranslateCmd {
  private metadataService: MetadataService;
  private translationService: TranslationService;

  constructor({ metadataService, translationService }: InitParams) {
    this.metadataService = metadataService;
    this.translationService = translationService;
  }

  public async run() {
    // select a platform.
    const platform = await this.metadataService.selectPlatform({
      placeHolder: `Select the platform to edit.`,
    });
    if (!platform) {
      return;
    }

    // get list of selected platform languages
    const languageList = this.metadataService.getLanguagesInPlatform(platform);
    if (languageList.length === 0) {
      const title = `There is no language to edit in ${platform}.`;
      const answer = await vscode.window.showInformationMessage(
        title,
        "Add Languages"
      );
      if (answer === "Add Languages") {
        await vscode.commands.executeCommand(Cmd.MetadataCreate, <
          MetadataCreateCmdArgs
        >{
          platform,
        });
      }
      return;
    }

    // select source metadata language
    const sourceMetadataLanguage = await this.metadataService.selectLanguage({
      languageList,
      title: "Select Source Language",
      placeHolder: `Select the source language that will be the translation source.`,
    });
    if (!sourceMetadataLanguage) {
      return;
    }

    // get source metadata
    const sourceMetadata = this.metadataService.createMetadataFile(
      platform,
      sourceMetadataLanguage
    );

    // check source metadata validation
    const sourceValidation = this.metadataService.check(sourceMetadata);
    const sourceValidationItems = sourceValidation.validationList
      .filter((validation) => validation.type !== MetadataValidationType.normal)
      .map((validation) => {
        return <MetadataValidationItem>{
          sectionName: sourceMetadata.platform,
          metadata: sourceMetadata,
          data: validation.data,
          type: validation.type,
        };
      });
    if (sourceValidationItems.length > 0) {
      const placeHolder = `There is a problem with the selected source metadata.`;
      Toast.e(placeHolder);

      // select invalid metadata
      const validation = await this.metadataService.selectValidationItem({
        sectionLabelList: [sourceMetadata.platform],
        itemList: sourceValidationItems,
        title: `Invalid Metadata : ${sourceMetadata.platform}/${sourceMetadata.language.locale}`,
        placeHolder,
      });
      if (!validation) {
        return;
      }

      await this.metadataService.handleValidationItem({
        validation,
        validationItemList: sourceValidationItems,
      });
      return;
    }

    // select target metadata languages
    const selectedMetadataLanguages =
      this.metadataService.getLanguagesInPlatform(platform);
    const targetMetadataLanguages =
      await this.metadataService.selectLanguageListInPlatform({
        platform,
        selectedLanguages: selectedMetadataLanguages,
        excludeLanguages: [sourceMetadataLanguage],
        title: "Select Target Languages",
        placeHolder: `Select the target languages to translate to.`,
      });
    if (targetMetadataLanguages.length === 0) {
      return;
    }

    // select a list of text files to translate
    const textListToTranslate: MetadataText[] =
      await this.metadataService.selectFilesToTranslate(sourceMetadata);
    if (textListToTranslate.length === 0) {
      return;
    }

    // select url files processing policy
    const urlTypeList = textListToTranslate.filter(
      (text) => text.type === MetadataType.url
    );
    const urlFilesProcessingPolicy =
      urlTypeList.length === 0
        ? MetadataUrlFilesProcessingPolicy.skip
        : await this.metadataService.selectUrlFilesProcessingPolicy();
    if (!urlFilesProcessingPolicy) {
      return;
    }

    // select translation type
    const translationType =
      await this.translationService.selectTranslationType();
    if (!translationType) {
      return;
    }

    const total = targetMetadataLanguages.length;
    let totalTranslated = 0;

    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        cancellable: true,
      },
      async (progress, token) => {
        for (const targetMetadataLanguage of targetMetadataLanguages) {
          if (token.isCancellationRequested) {
            // cancel
            Toast.i(`🟠 Canceled`);
            break;
          }

          // get folders and files.
          const targetMetadata = this.metadataService.createMetadataFile(
            platform,
            targetMetadataLanguage
          );
          await this.translate({
            sourceMetadata,
            targetMetadata,
            textListToTranslate,
            urlFilesProcessingPolicy,
            translationType,
          });
          totalTranslated += 1;

          progress.report({
            increment: 100 / total,
            message: `${platform}/${targetMetadataLanguage.locale} translated. (${totalTranslated} / ${total})`,
          });
        }
      }
    );

    Toast.i(`${platform} ${totalTranslated} language metadata translated.`);

    // check
    const isPreceedValidation = await Dialog.showConfirmDialog({
      title: "Would you like to check the results?",
    });
    if (isPreceedValidation) {
      await vscode.commands.executeCommand(Cmd.MetadataCheck);
    }
  }

  private async translate({
    sourceMetadata,
    targetMetadata,
    textListToTranslate,
    urlFilesProcessingPolicy,
    translationType,
  }: {
    sourceMetadata: Metadata;
    targetMetadata: Metadata;
    textListToTranslate: MetadataText[];
    urlFilesProcessingPolicy: MetadataUrlFilesProcessingPolicy;
    translationType: TranslationType;
  }): Promise<void> {
    for (const sourceData of sourceMetadata.dataList) {
      const targetFilePath = path.join(
        targetMetadata.languagePath,
        sourceData.fileName
      );
      switch (sourceData.type) {
        case MetadataType.text:
          if (!textListToTranslate.includes(sourceData)) {
            continue;
          }
          // translate
          const result = await this.translationService.translate({
            type: translationType,
            queries: sourceData.text.split("\n"),
            sourceLang: sourceMetadata.language.translateLanguage,
            targetLang: targetMetadata.language.translateLanguage,
          });
          const translatedText = result.data.join("\n");
          this.metadataService.updateMetadataText(
            targetFilePath,
            translatedText
          );
          break;
        case MetadataType.url:
          if (
            urlFilesProcessingPolicy ===
            MetadataUrlFilesProcessingPolicy.override
          ) {
            this.metadataService.updateMetadataText(
              targetFilePath,
              sourceData.text
            );
          }
          break;
      }
    }
  }
}
