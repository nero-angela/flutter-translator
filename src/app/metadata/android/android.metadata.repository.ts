import { LanguageRepository } from "../../language/language.repository";
import { MetadataLanguage, PlatformMetadataRepository } from "../metadata";

export class AndroidMetadataRepository implements PlatformMetadataRepository {
  public supportLanguages: MetadataLanguage[] = [
    { name: "Afrikaans", locale: "af", language: LanguageRepository.afrikaans },
    { name: "Albanian", locale: "sq", language: LanguageRepository.albanian },
    { name: "Amharic", locale: "am", language: LanguageRepository.amharic },
    { name: "Arabic", locale: "ar", language: LanguageRepository.arabic },
    {
      name: "Armenian",
      locale: "hy-AM",
      language: LanguageRepository.armenian,
    },
    {
      name: "Azerbaijani",
      locale: "az-AZ",
      language: LanguageRepository.azerbaijani,
    },
    { name: "Bangla", locale: "bn-BD", language: LanguageRepository.bengali },
    { name: "Basque", locale: "eu-ES", language: LanguageRepository.basque },
    {
      name: "Belarusian",
      locale: "be",
      language: LanguageRepository.belarusian,
    },
    { name: "Bulgarian", locale: "bg", language: LanguageRepository.bulgarian },
    { name: "Burmese", locale: "my-MM", language: LanguageRepository.myanmar },
    { name: "Catalan", locale: "ca", language: LanguageRepository.catalan },
    {
      name: "Chinese (Hong Kong)",
      locale: "zh-HK",
      language: LanguageRepository.chineseTraditional,
    },
    {
      name: "Chinese (Simplified)",
      locale: "zh-CN",
      language: LanguageRepository.chineseSimplified,
    },
    {
      name: "Chinese (Traditional)",
      locale: "zh-TW",
      language: LanguageRepository.chineseTraditional,
    },
    { name: "Croatian", locale: "hr", language: LanguageRepository.croatian },
    { name: "Czech", locale: "cs-CZ", language: LanguageRepository.czech },
    { name: "Danish", locale: "da-DK", language: LanguageRepository.danish },
    { name: "Dutch", locale: "nl-NL", language: LanguageRepository.dutch },
    {
      name: "English (India)",
      locale: "en-IN",
      language: LanguageRepository.english,
    },
    {
      name: "English (Singapore)",
      locale: "en-SG",
      language: LanguageRepository.english,
    },
    {
      name: "English (South Africa)",
      locale: "en-ZA",
      language: LanguageRepository.english,
    },
    {
      name: "English (Australia)",
      locale: "en-AU",
      language: LanguageRepository.english,
    },
    {
      name: "English (Canada)",
      locale: "en-CA",
      language: LanguageRepository.english,
    },
    {
      name: "English (United Kingdom)",
      locale: "en-GB",
      language: LanguageRepository.english,
    },
    {
      name: "English (United States)",
      locale: "en-US",
      language: LanguageRepository.english,
    },
    { name: "Estonian", locale: "et", language: LanguageRepository.estonian },
    { name: "Filipino", locale: "fil", language: LanguageRepository.tagalog },
    { name: "Finnish", locale: "fi-FI", language: LanguageRepository.finnish },
    {
      name: "French (Canada)",
      locale: "fr-CA",
      language: LanguageRepository.french,
    },
    {
      name: "French (France)",
      locale: "fr-FR",
      language: LanguageRepository.french,
    },
    {
      name: "Galician",
      locale: "gl-ES",
      language: LanguageRepository.galician,
    },
    {
      name: "Georgian",
      locale: "ka-GE",
      language: LanguageRepository.georgian,
    },
    { name: "German", locale: "de-DE", language: LanguageRepository.german },
    { name: "Greek", locale: "el-GR", language: LanguageRepository.greek },
    { name: "Gujarati", locale: "gu", language: LanguageRepository.gujarati },
    { name: "Hebrew", locale: "iw-IL", language: LanguageRepository.hebrew },
    { name: "Hindi", locale: "hi-IN", language: LanguageRepository.hindi },
    {
      name: "Hungarian",
      locale: "hu-HU",
      language: LanguageRepository.hungarian,
    },
    {
      name: "Icelandic",
      locale: "is-IS",
      language: LanguageRepository.icelandic,
    },
    {
      name: "Indonesian",
      locale: "id",
      language: LanguageRepository.indonesian,
    },
    { name: "Italian", locale: "it-IT", language: LanguageRepository.italian },
    {
      name: "Japanese",
      locale: "ja-JP",
      language: LanguageRepository.japanese,
    },
    { name: "Kannada", locale: "kn-IN", language: LanguageRepository.kannada },
    { name: "Kazakh", locale: "kk", language: LanguageRepository.kazakh },
    { name: "Khmer", locale: "km-KH", language: LanguageRepository.khmer },
    { name: "Korean", locale: "ko-KR", language: LanguageRepository.korean },
    { name: "Kyrgyz", locale: "ky-KG", language: LanguageRepository.kyrgyz },
    { name: "Lao", locale: "lo-LA", language: LanguageRepository.lao },
    { name: "Latvian", locale: "lv", language: LanguageRepository.latvian },
    {
      name: "Lithuanian",
      locale: "lt",
      language: LanguageRepository.lithuanian,
    },
    {
      name: "Macedonian",
      locale: "mk-MK",
      language: LanguageRepository.macedonian,
    },
    { name: "Malay", locale: "ms", language: LanguageRepository.malay },
    {
      name: "Malay (Malaysia)",
      locale: "ms-MY",
      language: LanguageRepository.malay,
    },
    {
      name: "Malayalam",
      locale: "ml-IN",
      language: LanguageRepository.malayalam,
    },
    { name: "Marathi", locale: "mr-IN", language: LanguageRepository.marathi },
    {
      name: "Mongolian",
      locale: "mn-MN",
      language: LanguageRepository.mongolian,
    },
    { name: "Nepali", locale: "ne-NP", language: LanguageRepository.nepali },
    {
      name: "Norwegian",
      locale: "no-NO",
      language: LanguageRepository.norwegian,
    },
    { name: "Persian", locale: "fa", language: LanguageRepository.persian },
    {
      name: "Persian (Arab Emirates)",
      locale: "fa-AE",
      language: LanguageRepository.persian,
    },
    {
      name: "Persian (Afghanistan)",
      locale: "fa-AF",
      language: LanguageRepository.persian,
    },
    {
      name: "Persian (Iran)",
      locale: "fa-IR",
      language: LanguageRepository.persian,
    },
    { name: "Polish", locale: "pl-PL", language: LanguageRepository.polish },
    {
      name: "Portuguese (Brazil)",
      locale: "pt-BR",
      language: LanguageRepository.portuguese,
    },
    {
      name: "Portuguese (Portugal)",
      locale: "pt-PT",
      language: LanguageRepository.portuguese,
    },
    { name: "Punjabi", locale: "pa", language: LanguageRepository.punjabi },
    { name: "Romanian", locale: "ro", language: LanguageRepository.romanian },
    // Google translation not support
    // { name: "Romansh", locale: "rm", },
    { name: "Russian", locale: "ru-RU", language: LanguageRepository.russian },
    { name: "Serbian", locale: "sr", language: LanguageRepository.serbian },
    { name: "Sinhala", locale: "si-LK", language: LanguageRepository.sinhala },
    { name: "Slovak", locale: "sk", language: LanguageRepository.slovak },
    { name: "Slovenian", locale: "sl", language: LanguageRepository.slovenian },
    {
      name: "Spanish (Latin America)",
      locale: "es-419",
      language: LanguageRepository.spanish,
    },
    {
      name: "Spanish (Spain)",
      locale: "es-ES",
      language: LanguageRepository.spanish,
    },
    {
      name: "Spanish (United States)",
      locale: "es-US",
      language: LanguageRepository.spanish,
    },
    { name: "Swahili", locale: "sw", language: LanguageRepository.swahili },
    { name: "Swedish", locale: "sv-SE", language: LanguageRepository.swedish },
    { name: "Tamil", locale: "ta-IN", language: LanguageRepository.tamil },
    { name: "Telugu", locale: "te-IN", language: LanguageRepository.telugu },
    { name: "Thai", locale: "th", language: LanguageRepository.thai },
    { name: "Turkish", locale: "tr-TR", language: LanguageRepository.turkish },
    { name: "Ukrainian", locale: "uk", language: LanguageRepository.ukrainian },
    { name: "Urdu", locale: "ur", language: LanguageRepository.urdu },
    {
      name: "Vietnamese",
      locale: "vi",
      language: LanguageRepository.vietnamese,
    },
    { name: "Zulu", locale: "zu", language: LanguageRepository.zulu },
  ];
}
