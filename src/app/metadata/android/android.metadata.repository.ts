import { MetadataLanguage, PlatformMetadataRepository } from "../metadata";
import { AndroidMetadata } from "./android.metadata";

export class AndroidMetadataRepository implements PlatformMetadataRepository {
  public supportLanguages: MetadataLanguage[] = [
    { name: "Afrikaans", locale: "af" },
    { name: "Albanian", locale: "sq" },
    { name: "Amharic", locale: "am" },
    { name: "Arabic", locale: "ar" },
    { name: "Armenian", locale: "hy-AM" },
    { name: "Azerbaijani", locale: "az-AZ" },
    { name: "Bangla", locale: "bn-BD" },
    { name: "Basque", locale: "eu-ES" },
    { name: "Belarusian", locale: "be" },
    { name: "Bulgarian", locale: "bg" },
    { name: "Burmese", locale: "my-MM" },
    { name: "Catalan", locale: "ca" },
    { name: "Chinese (Hong Kong)", locale: "zh-HK" },
    { name: "Chinese (Simplified)", locale: "zh-CN" },
    { name: "Chinese (Traditional)", locale: "zh-TW" },
    { name: "Croatian", locale: "hr" },
    { name: "Czech", locale: "cs-CZ" },
    { name: "Danish", locale: "da-DK" },
    { name: "Dutch", locale: "nl-NL" },
    { name: "English (India)", locale: "en-IN" },
    { name: "English (Singapore)", locale: "en-SG" },
    { name: "English (South Africa)", locale: "en-ZA" },
    { name: "English (Australia)", locale: "en-AU" },
    { name: "English (Canada)", locale: "en-CA" },
    { name: "English (United Kingdom)", locale: "en-GB" },
    { name: "English (United States)", locale: "en-US" },
    { name: "Estonian", locale: "et" },
    { name: "Filipino", locale: "fil" },
    { name: "Finnish", locale: "fi-FI" },
    { name: "French (Canada)", locale: "fr-CA" },
    { name: "French (France)", locale: "fr-FR" },
    { name: "Galician", locale: "gl-ES" },
    { name: "Georgian", locale: "ka-GE" },
    { name: "German", locale: "de-DE" },
    { name: "Greek", locale: "el-GR" },
    { name: "Gujarati", locale: "gu" },
    { name: "Hebrew", locale: "iw-IL" },
    { name: "Hindi", locale: "hi-IN" },
    { name: "Hungarian", locale: "hu-HU" },
    { name: "Icelandic", locale: "is-IS" },
    { name: "Indonesian", locale: "id" },
    { name: "Italian", locale: "it-IT" },
    { name: "Japanese", locale: "ja-JP" },
    { name: "Kannada", locale: "kn-IN" },
    { name: "Kazakh", locale: "kk" },
    { name: "Khmer", locale: "km-KH" },
    { name: "Korean", locale: "ko-KR" },
    { name: "Kyrgyz", locale: "ky-KG" },
    { name: "Lao", locale: "lo-LA" },
    { name: "Latvian", locale: "lv" },
    { name: "Lithuanian", locale: "lt" },
    { name: "Macedonian", locale: "mk-MK" },
    { name: "Malay", locale: "ms" },
    { name: "Malay (Malaysia)", locale: "ms-MY" },
    { name: "Malayalam", locale: "ml-IN" },
    { name: "Marathi", locale: "mr-IN" },
    { name: "Mongolian", locale: "mn-MN" },
    { name: "Nepali", locale: "ne-NP" },
    { name: "Norwegian", locale: "no-NO" },
    { name: "Persian", locale: "fa" },
    { name: "Persian (Arab Emirates)", locale: "fa-AE" },
    { name: "Persian (Afghanistan)", locale: "fa-AF" },
    { name: "Persian (Iran)", locale: "fa-IR" },
    { name: "Polish", locale: "pl-PL" },
    { name: "Portuguese (Brazil)", locale: "pt-BR" },
    { name: "Portuguese (Portugal)", locale: "pt-PT" },
    { name: "Punjabi", locale: "pa" },
    { name: "Romanian", locale: "ro" },
    { name: "Romansh", locale: "rm" },
    { name: "Russian", locale: "ru-RU" },
    { name: "Serbian", locale: "sr" },
    { name: "Sinhala", locale: "si-LK" },
    { name: "Slovak", locale: "sk" },
    { name: "Slovenian", locale: "sl" },
    { name: "Spanish (Latin America)", locale: "es-419" },
    { name: "Spanish (Spain)", locale: "es-ES" },
    { name: "Spanish (United States)", locale: "es-US" },
    { name: "Swahili", locale: "sw" },
    { name: "Swedish", locale: "sv-SE" },
    { name: "Tamil", locale: "ta-IN" },
    { name: "Telugu", locale: "te-IN" },
    { name: "Thai", locale: "th" },
    { name: "Turkish", locale: "tr-TR" },
    { name: "Ukrainian", locale: "uk" },
    { name: "Urdu", locale: "ur" },
    { name: "Vietnamese", locale: "vi" },
    { name: "Zulu", locale: "zu" },
  ];
}