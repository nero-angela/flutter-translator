import path from "path";
import {
  InvalidArbFileNameException,
  InvalidLanguageCodeException,
} from "../../util/exceptions";
import { ConfigService, FilePath, LanguageCode } from "../config/config";
import { Language } from "./language";
import { LanguageRepository } from "./language.repository";

interface InitParams {
  configService: ConfigService;
}

export class LanguageService {
  private configService: ConfigService;
  constructor({ configService }: InitParams) {
    this.configService = configService;
  }

  public get supportLanguages(): Language[] {
    return LanguageRepository.supportLanguageList;
  }

  /**
   * check whether the language code is supported or not
   * @param languageCode
   * @throws InvalidLanguageCodeException
   */
  private checkIsSupportLanguageCode(languageCode: LanguageCode) {
    const language = this.supportLanguages.find(
      (language) => language.languageCode === languageCode
    );
    if (!language) {
      throw new InvalidLanguageCodeException(languageCode);
    }
  }

  /**
   * arbFilePath -> LanguageCode -> Language
   * @param arbFilePath
   * @returns Language
   * @throws InvalidLanguageCodeException, InvalidArbFileNameException
   */
  public async getLanguageFromARBFilePath(
    arbFilePath: string
  ): Promise<Language> {
    const languageCode = await this.getLanguageCodeFromARBFilePath(arbFilePath);
    return this.getLanguageByLanguageCode(languageCode);
  }

  /**
   * LanguageCode -> Language
   * @param languageCode
   * @returns Language
   * @throws InvalidLanguageCodeException
   */
  getLanguageByLanguageCode(languageCode: string): Language {
    const language = this.supportLanguages.find(
      (sl) => sl.languageCode === languageCode
    );
    if (!language) {
      throw new InvalidLanguageCodeException(languageCode);
    }
    return language;
  }

  public async getLanguageCodeFromARBFilePath(
    arbFilePath: string
  ): Promise<LanguageCode> {
    const prefix = await this.configService.getARBPrefix();
    const fileName = arbFilePath.split("/").pop()!.split(".arb")[0];
    let languageCode: string;

    // customArbFileName -> LanguageCode
    const customArbFileName = await this.configService.getCustomARBFileName();
    const index = customArbFileName.arbFileNameList.indexOf(fileName);
    if (index !== -1) {
      languageCode = customArbFileName.languageCodeList[index];
      return languageCode;
    }

    // arbFilePath -> LanguageCode
    try {
      const fileName = arbFilePath.split("/").pop()!.split(".arb")[0];
      languageCode = prefix ? fileName?.split(prefix)[1]! : fileName;

      this.checkIsSupportLanguageCode(languageCode);
      return languageCode;
    } catch (e: any) {
      throw new InvalidArbFileNameException(arbFilePath);
    }
  }

  /**
   * Get file name from LanguageCode
   * @param languageCode
   */
  public async getFileNameFromLanguageCode(
    languageCode: LanguageCode
  ): Promise<string> {
    const arbFilePath = await this.getARBPathFromLanguageCode(languageCode);
    return path.basename(arbFilePath);
  }

  /**
   * LanguageCode -> arbFilePath
   * @param languageCode
   * @returns ArbFilePath
   * @throws SourceArbFilePathRequiredException, InvalidLanguageCodeException
   */
  public async getARBPathFromLanguageCode(
    languageCode: string
  ): Promise<FilePath> {
    const ext = ".arb";
    const sourceARBPath = await this.configService.getSourceARBPath();
    const arbFolderPath: string = (sourceARBPath.match(/(.*\/)/) ?? [""])[0];

    // languageCode -> customARBFileName
    const customARBFileName = await this.configService.getCustomARBFileName();
    const index = customARBFileName.languageCodeList.indexOf(languageCode);
    if (index !== -1) {
      const arbFileName = customARBFileName.arbFileNameList[index];
      const arbFilePath = path.join(
        arbFolderPath,
        arbFileName + (arbFileName.endsWith(ext) ? "" : ext)
      );
      return arbFilePath;
    }

    // languageCode -> defaultArbFileName
    const language = this.getLanguageByLanguageCode(languageCode);
    const prefix = await this.configService.getARBPrefix();
    const arbFilePath = path.join(
      arbFolderPath,
      `${(prefix ?? "") + language.languageCode + ext}`
    );
    return arbFilePath;
  }
}
