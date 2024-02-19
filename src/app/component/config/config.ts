import { CustomARBFileName, Language } from "../language/language";
import { XcodeProjectName } from "../xcode/xcode";

export type LanguageCode = string;
export type GoogleAPIKey = string;
export type ARBFileName = string;
export type FilePath = string;

export type ARBConfig = {
  sourcePath: FilePath;
  exclude: LanguageCode[];
  prefix?: string | undefined;
  custom: Record<LanguageCode, ARBFileName>;
};

export type GoogleAuthConfig = {
  apiKey: GoogleAPIKey;
  credential: FilePath;
};

export type GoogleSheetConfig = {
  id: string;
  name: string;
  exclude: LanguageCode[];
};

export type XcodeConfig = {
  custom: Record<XcodeProjectName, LanguageCode>;
};

export type Config = {
  arbConfig: ARBConfig;
  googleAuthConfig: GoogleAuthConfig;
  googleSheetConfig: GoogleSheetConfig;
  xcodeConfig: XcodeConfig;
};

export interface ConfigDataSourceI {
  getConfig(): Partial<Config>;
  setConfig(config: Partial<Config>): void;
}

export interface ConfigRepositoryI {
  getARBConfig(): ARBConfig;
  setARBConfig(arbConfig: Partial<ARBConfig>): void;

  getGoogleAuthConfig(): GoogleAuthConfig;
  setGoogleAuthConfig(googleAuthConfig: Partial<GoogleAuthConfig>): void;

  getGoogleSheetConfig(): GoogleSheetConfig;
  setGoogleSheetConfig(googleSheetConfig: Partial<GoogleSheetConfig>): void;

  getXcodeConfig(): XcodeConfig;
  setXcodeConfig(xcodeConfig: Partial<XcodeConfig>): void;
}

export interface ConfigService {
  getSourceARBPath(): Promise<string>;
  getCustomARBFileName(): Promise<CustomARBFileName>;
  getARBPrefix(): Promise<string | undefined>;
  getARBExcludeLanguageCodeList(): LanguageCode[];
  getGoogleAuthCredential(): Promise<FilePath>;
  getGoogleAuthAPIKey(): Promise<GoogleAPIKey>;
  getCustomXcodeProjectLanguageCode(): Record<XcodeProjectName, LanguageCode>;
  setCustomXcodeProjectLanguage(
    projectName: XcodeProjectName
  ): Promise<Language | undefined>;
}
