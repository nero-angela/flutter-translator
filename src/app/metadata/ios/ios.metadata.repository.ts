import { MetadataLanguage, PlatformMetadataRepository } from "../metadata";
import { IOSMetadata } from "./ios.metadata";

export class IOSMetadataRepository implements PlatformMetadataRepository {
  public supportLanguages = [
    { name: "Arabic", locale: "ar-SA" },
    { name: "Catalan", locale: "ca" },
    { name: "Chinese (Simplified)", locale: "zh-Hans" },
    { name: "Chinese (Traditional)", locale: "zh-Hant" },
    { name: "Croatian", locale: "hr" },
    { name: "Czech", locale: "cs" },
    { name: "Danish", locale: "da" },
    { name: "Dutch", locale: "nl-NL" },
    { name: "English (Australia)", locale: "en-AU" },
    { name: "English (Canada)", locale: "en-CA" },
    { name: "English (U.K.)", locale: "en-GB" },
    { name: "English (U.S.)", locale: "en-US" },
    { name: "Finnish", locale: "fi" },
    { name: "French", locale: "fr-FR" },
    { name: "French (Canada)", locale: "fr-CA" },
    { name: "German", locale: "de-DE" },
    { name: "Greek", locale: "el" },
    { name: "Hebrew", locale: "he" },
    { name: "Hindi", locale: "hi" },
    { name: "Hungarian", locale: "hu" },
    { name: "Indonesian", locale: "id" },
    { name: "Italian", locale: "it" },
    { name: "Japanese", locale: "ja" },
    { name: "Korean", locale: "ko" },
    { name: "Malay", locale: "ms" },
    { name: "Norwegian", locale: "no" },
    { name: "Polish", locale: "pl" },
    { name: "Portuguese (Brazil)", locale: "pt-BR" },
    { name: "Portuguese (Portugal)", locale: "pt-PT" },
    { name: "Romanian", locale: "ro" },
    { name: "Russian", locale: "ru" },
    { name: "Slovak", locale: "sk" },
    { name: "Spanish (Mexico)", locale: "es-MX" },
    { name: "Spanish (Spain)", locale: "es-ES" },
    { name: "Swedish", locale: "sv" },
    { name: "Thai", locale: "th" },
    { name: "Turkish", locale: "tr" },
    { name: "Ukrainian", locale: "uk" },
    { name: "Vietnamese.", locale: "vi" },
  ];
}