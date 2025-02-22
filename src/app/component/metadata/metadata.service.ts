import path from "path";
import * as vscode from "vscode";
import { Dialog } from "../../util/dialog";
import { Link } from "../../util/link";
import { Toast } from "../../util/toast";
import { Workspace } from "../../util/workspace";
import {
  Metadata,
  MetadataLanguage,
  MetadataPlatformLanguage,
  MetadataSupportPlatform,
  MetadataText,
  MetadataType,
  MetadataUrlFilesProcessingPolicy,
} from "./metadata";
import { MetadataRepository } from "./metadata.repository";
import {
  MetadataValidation,
  MetadataValidationItem,
  MetadataValidationType,
} from "./metadata.validation";

interface InitParams {
  metadataRepository: MetadataRepository;
}

export class MetadataService {
  private metadataRepository: MetadataRepository;

  constructor({ metadataRepository }: InitParams) {
    this.metadataRepository = metadataRepository;
  }

  public async selectPlatform({
    title,
    placeHolder,
  }: {
    title?: string;
    placeHolder?: string;
  }): Promise<MetadataSupportPlatform | undefined> {
    const selectedPlatform = await vscode.window.showQuickPick(
      Object.entries(MetadataSupportPlatform).map(([label, value]) => ({
        label,
        platform: value as MetadataSupportPlatform,
      })),
      {
        title: title ?? "Select Platform",
        placeHolder: placeHolder ?? "Select Platform",
      }
    );
    return selectedPlatform?.platform;
  }

  public getMetadataPath(platform: MetadataSupportPlatform): string {
    return this.metadataRepository.getMetadataPath(platform);
  }

  public getLanguagesInPlatform(
    platform: MetadataSupportPlatform
  ): MetadataLanguage[] {
    return this.metadataRepository.getLanguagesInPlatform(platform);
  }

  public async selectLanguageListInPlatform({
    platform,
    selectedLanguages,
    excludeLanguages,
    title,
    placeHolder,
  }: {
    platform: MetadataSupportPlatform;
    selectedLanguages?: MetadataLanguage[];
    excludeLanguages?: MetadataLanguage[];
    title?: string;
    placeHolder?: string;
  }): Promise<MetadataLanguage[]> {
    const languages = this.metadataRepository.getSupportLanguages(platform);
    const [selected, notSelected] = ["Selected", "Not Selected"];
    const selections = await Dialog.showSectionedPicker<
      MetadataLanguage,
      MetadataLanguage
    >({
      sectionLabelList: [selected, notSelected],
      canPickMany: true,
      title: title ?? "Select Language list",
      placeHolder: placeHolder ?? "Select Language list",
      itemList: languages.filter(
        (language) => !(excludeLanguages ?? []).includes(language)
      ),
      itemBuilder: (language) => {
        const picked = selectedLanguages?.includes(language);
        return {
          section: selectedLanguages?.includes(language)
            ? selected
            : notSelected,
          item: {
            label: `${language.name} (${language.locale})`,
            picked,
          },
          data: language,
        };
      },
    });
    return selections ?? [];
  }

  public async selectPlatformLanguages({
    excludePlatformLanguages,
    title,
    placeHolder,
    picked,
  }: {
    excludePlatformLanguages?: {
      [platform in MetadataSupportPlatform]: MetadataLanguage[];
    };
    title?: string;
    placeHolder?: string;
    picked?: boolean;
  }): Promise<
    {
      platform: MetadataSupportPlatform;
      language: MetadataLanguage;
    }[]
  > {
    const platformLanguages: MetadataPlatformLanguage[] = [];
    for (const platform of Object.values(MetadataSupportPlatform)) {
      for (const language of this.getLanguagesInPlatform(platform)) {
        if (excludePlatformLanguages) {
          const excludePlatform = excludePlatformLanguages[platform];
          if (excludePlatform.includes(language)) {
            continue;
          }
        }
        platformLanguages.push({
          platform,
          language,
        });
      }
    }
    const selections = await Dialog.showSectionedPicker<
      MetadataPlatformLanguage,
      MetadataPlatformLanguage
    >({
      sectionLabelList: Object.keys(MetadataSupportPlatform),
      itemList: platformLanguages,
      itemBuilder: (pl) => {
        return {
          section: pl.platform,
          item: {
            label: `${pl.language.name} (${pl.language.locale})`,
            picked: picked,
            language: pl,
          },
          data: pl,
        };
      },
      canPickMany: true,
      title: title ?? "Select Language list",
      placeHolder: placeHolder ?? "Select Language list",
    });
    return selections ?? [];
  }

  public async selectLanguage({
    languageList,
    title,
    placeHolder,
  }: {
    languageList: MetadataLanguage[];
    title?: string;
    placeHolder?: string;
  }): Promise<MetadataLanguage | undefined> {
    const selectedLocale = await vscode.window.showQuickPick(
      languageList.map((language) => ({
        label: language.name,
        description: language.locale,
        language,
      })),
      {
        title: title ?? "Select Language",
        placeHolder: placeHolder ?? "Select Language",
        ignoreFocusOut: true,
      }
    );
    return selectedLocale?.language;
  }

  public getExistMetadataFile(
    platform: MetadataSupportPlatform,
    language: MetadataLanguage
  ): Metadata | undefined {
    return this.metadataRepository.getExistMetadataFile(platform, language);
  }

  public createMetadataFile(
    platform: MetadataSupportPlatform,
    language: MetadataLanguage
  ): Metadata {
    return this.metadataRepository.createMetadataFile(platform, language);
  }

  public updateMetadata(metadata: Metadata): Metadata {
    return this.metadataRepository.updateMetadata(metadata);
  }

  public updateMetadataText(filePath: string, text: string): void {
    return this.metadataRepository.updateMetadataText(filePath, text);
  }

  public async selectUrlFilesProcessingPolicy(): Promise<
    MetadataUrlFilesProcessingPolicy | undefined
  > {
    const selection = await vscode.window.showQuickPick(
      Object.entries(MetadataUrlFilesProcessingPolicy).map(
        ([label, value]) => ({
          label,
          policy: value as MetadataUrlFilesProcessingPolicy,
        })
      ),
      {
        title: "Url Files Processing Policy",
        placeHolder: "Please select a policy for handling URL files.",
      }
    );
    return selection?.policy;
  }

  public async selectFilesToTranslate(
    metadata: Metadata
  ): Promise<MetadataText[]> {
    const selections = await vscode.window.showQuickPick(
      metadata.dataList
        .filter((data) => data.type === MetadataType.text)
        .map((data) => ({
          label: data.fileName,
          picked: data.text.length > 0,
          description: `${data.text.length.toLocaleString()} characters`,
          data,
        })),
      {
        title: "Select Files",
        placeHolder: "Select list of files to translate",
        ignoreFocusOut: true,
        canPickMany: true,
      }
    );
    return (selections ?? []).map((selection) => selection.data);
  }

  public async showMetadataInputBox(
    metadata: Metadata
  ): Promise<Metadata | undefined> {
    for (const data of metadata.dataList) {
      const maxLengthGuide = `Please write the ${data.fileName} within ${data.maxLength} characters.`;
      const urlGuide = `Please enter ${data.fileName} in URL format starting with http.`;
      const optional = data.optional ? "(Optional) " : "(Required) ";
      const text = await vscode.window.showInputBox({
        title: data.fileName,
        ignoreFocusOut: true,
        value: data.text,
        placeHolder:
          optional +
          (data.maxLength
            ? maxLengthGuide
            : data.type === MetadataType.url
            ? urlGuide
            : ""),
        validateInput: (value) => {
          // optional
          if (data.optional && !value) {
            return null;
          }

          switch (data.type) {
            case MetadataType.text:
              if (data.maxLength && value.length > data.maxLength) {
                return maxLengthGuide;
              }
              break;
            case MetadataType.url:
              if (!data.text.startsWith("http")) {
                return urlGuide;
              }
              break;
          }
          if (!data.optional && !value) {
            return `${data.fileName} is required.`;
          }
        },
      });

      if (!data.optional && !text) {
        // canceled
        return;
      }

      data.text = text ?? "";
    }
    return metadata;
  }

  public check(metadata: Metadata): MetadataValidation {
    return this.metadataRepository.check(metadata);
  }

  public checkAll(): MetadataValidation[] {
    const validationList: MetadataValidation[] = [];
    for (const platform of Object.values(MetadataSupportPlatform)) {
      const metadataLangauges = this.getLanguagesInPlatform(platform);
      for (const metadataLanguage of metadataLangauges) {
        const metadata = this.getExistMetadataFile(platform, metadataLanguage);
        if (!metadata) {
          continue;
        }

        const validation = this.metadataRepository.check(metadata);
        validationList.push(validation);
      }
    }
    return validationList;
  }

  public async selectValidationItem({
    sectionLabelList,
    itemList,
    title,
    placeHolder,
  }: {
    sectionLabelList: string[];
    itemList: MetadataValidationItem[];
    title?: string;
    placeHolder?: string;
  }): Promise<MetadataValidationItem | undefined> {
    const selections = await Dialog.showSectionedPicker<
      MetadataValidationItem,
      MetadataValidationItem
    >({
      title: title ?? "Invalid Metadata List",
      placeHolder: placeHolder,
      canPickMany: false,
      sectionLabelList,
      itemList,
      itemBuilder: (item) => {
        return {
          section: item.sectionName,
          item: {
            label: item.data.fileName,
            detail: item.type,
            picked: false,
          },
          data: item,
        };
      },
    });
    if (!selections || selections.length === 0) {
      return;
    }
    return selections[0];
  }

  public async handleValidationItem({
    validation,
    validationItemList,
  }: {
    validation: MetadataValidationItem;
    validationItemList: MetadataValidationItem[];
  }) {
    const filePath = path.join(
      validation.metadata.languagePath,
      validation.data.fileName
    );

    const currentLength = validation.data.text.length;
    const maxLength = validation.data.maxLength ?? 0;
    const { platform, language } = validation.metadata;
    switch (validation.type) {
      case MetadataValidationType.overflow:
        await Workspace.open(filePath);
        const overflow = currentLength - maxLength;
        Toast.e(
          `Characters overflow (max: ${maxLength.toLocaleString()} / current: ${currentLength} / overflow: ${overflow.toLocaleString()})`
        );
        // open google translate website
        await Link.openGoogleTranslateWebsite({
          sourceLanguage: validation.metadata.language.translateLanguage,
          text: validation.data.text,
        });
        break;
      case MetadataValidationType.required:
        await Workspace.open(filePath);
        Toast.e(
          `${
            validation.data.fileName
          } is required (maxLength: ${maxLength.toLocaleString()})`
        );
        break;
      case MetadataValidationType.invalidURL:
        await Workspace.open(filePath);
        const message = validation.data.optional
          ? `${validation.data.fileName} can enter a URL starting with http or leave it blank.`
          : `${validation.data.fileName} must enter a URL starting with http.`;
        Toast.e(message);
        break;
      case MetadataValidationType.notExist:
        const notExistItemList = validationItemList.filter(
          (item) => item.type === MetadataValidationType.notExist
        );
        // show create files confirm
        if (notExistItemList.length === 1) {
          // create one
          Workspace.createPath(filePath);
          const fileName = `${platform}/${language.locale}/${validation.data.fileName}`;
          Toast.i(`${fileName} created.`);
          await Workspace.open(filePath);
          return;
        }

        const isConfirm = Dialog.showConfirmDialog({
          title: `Do you want to create all missing ${notExistItemList.length} files?`,
        });
        if (!isConfirm) {
          // canceled
          return;
        } else {
          // confirm
          for (const item of notExistItemList) {
            Workspace.createPath(
              path.join(item.metadata.languagePath, item.data.fileName)
            );
          }
          Toast.i(`${notExistItemList.length} files created.`);
          return;
        }
      case MetadataValidationType.normal:
        break;
    }
  }
}
