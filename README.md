# Flutter Translator
## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Usage](#usage)
- [Configuration](#configuration)
- [Translate](#translate)
- [License](#license)

## Introduction
Supports [internationalization of Flutter applications](https://docs.flutter.dev/ui/accessibility-and-internationalization/internationalization) using [Google Translate](https://cloud.google.com/translate/docs/basic/translating-text).
This is a extension created based on an environment using **Flutter** and **Fastlane**.
- Support platform
  - `Android`
  - `iOS`
- Support Languages
  - [Show List](https://gist.github.com/nero-angela/37984030bcc5dd0e62dc3143bb8c053d)
  - ARB : 133 Languages ([Google Translate](https://cloud.google.com/translate/docs/basic/discovering-supported-languages))
  - Android : 86 Languages ([PlayStore](https://support.google.com/googleplay/android-developer/answer/9844778?visit_id=638424490119108924-4187109290&rd=1#zippy=%2Cview-list-of-available-languages%2C%EC%82%AC%EC%9A%A9-%EA%B0%80%EB%8A%A5%ED%95%9C-%EC%96%B8%EC%96%B4-%EB%AA%A9%EB%A1%9D-%EB%B3%B4%EA%B8%B0) : exclude `Romansh`)
  - iOS : 39 Languages ([Fastlane Deliver](https://docs.fastlane.tools/actions/deliver/#:~:text=Tips-,Available,-language%20codes) / [AppStore](https://developer.apple.com/help/app-store-connect/reference/app-store-localizations))

## Features
- [ARB](#arb) files translation and management.
- [Metadata](#metadata) files translation and management.
- [Changelog](#changelog) files translation and management.

## Usage
### ARB
1. Configure the Flutter project localizations environment by referring to the [documentation](https://docs.flutter.dev/ui/accessibility-and-internationalization/internationalization).
1. Run `Flutter Translator: ARB - Initialize`
1. Run `Flutter Translator: ARB - Translate`

### Metadata
1. Run `Flutter Translator: Metadata - Translate`
2. The folder structure below is automatically created when the command is executed. (Based on fastlane [upload_to_play_store](https://docs.fastlane.tools/actions/upload_to_play_store/) & [deliver](https://docs.fastlane.tools/actions/deliver/))
    ```
    ├── android
    │    └── fastlane
    │        └── metadata
    │            └── android
    │                ├── en-US
    │                │   └── changelogs
    │                │       ├── full_description.txt
    │                │       ├── short_description.txt
    │                │       ├── title.txt
    │                │       └── video.txt
    │                └── ko-KR
    │                        ├── full_description.txt
    │                        ├── short_description.txt
    │                        ├── title.txt
    │                        └── video.txt
    └── ios
        └── fastlane
            └── metadata
                ├── en-US
                │   ├── description.txt
                │   ├── keywords.txt
                │   ├── marketing_url.txt
                │   ├── name.txt
                │   ├── privacy_url.txt
                │   ├── subtitle.txt
                │   └── support_url.txt
                └── ko-KR
                    ├── description.txt
                    ├── keywords.txt
                    ├── marketing_url.txt
                    ├── name.txt
                    ├── privacy_url.txt
                    ├── subtitle.txt
                    └── support_url.txt
    ```

### Changelog
1. Run `Flutter Translator: Changelog - Translate`
1. The folder structure below is automatically created when the command is executed.  (Based on fastlane [upload_to_play_store](https://docs.fastlane.tools/actions/upload_to_play_store/) & [deliver](https://docs.fastlane.tools/actions/deliver/))
    ```
    ├── android
    │    └── fastlane
    │        └── metadata
    │            └── android
    │                ├── en-US
    │                │   └── changelogs
    │                │       ├── default.txt
    │                │       ├── 1.txt
    │                │       └── 2.txt
    │                └── ko-KR
    │                    └── changelogs
    │                        ├── default.txt
    │                        ├── 1.txt
    │                        └── 2.txt
    └── ios
        └── fastlane
            └── metadata
                ├── en-US
                │   └── promotional_text.txt
                └── ko-KR
                    └── promotional_text.txt
    ```

## Configuration
It is recommended to set the configuration in the project workspace(`.vscode/settings.json`).
```
{
  "flutterTranslator.config": {
    "arbConfig": {
      "sourcePath": "ABSOLUTE_PATH/intl_en.arb";
      "exclude": ["ko", "zh_CN", "fr"];
      "prefix": "intl_";
      "custom": {
        "zh_CN": "intl_zh_Hant"
      }
    }
    "googleAuthConfig": {
      "apiKey": "YOUR_GOOGLE_API_KEY";
      "credential": "YOUR_CREDENTIAL_JSON_FILE_ABSOLUTE_PATH";
    }
    "googleSheet": {
      id: "YOUR_GOOGLE_SHEET_ID",
      name: "YOUR_GOOGLE_SHEET_NAME",
      exclude: ["ko", "zh_CN", "fr"]
    },
  }
}
```
- **ARBConfig**
  - `sourcePath` : Absolute path to the source ARB file you want to translate.
  - `exclude` : List of language codes that you do not want to translate.
  - `prefix` : Arb common string to prepend to file name. (e.g. `intl_` : `intl_ko.arb`, `intl_hi.arb`, `intl_fr.arb`)
  - `custom` : You can customize the ARB file name for languageCode in the format `{LanguageCode: CUSTOM_NAME}` and arbFilePrefix is not applied.
- **GoogleAuthConfig**
  - `apiKey` : This is a Google API key and is required when using the paid translation function.
  - `credential` : Absolute path to JSON key files created after creating a [service account](https://developers.google.com/workspace/guides/create-credentials?#service-account) on the Google Cloud console.
- **GoogleSheet**
  - `id` : You can find the spreadsheet ID in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/<GOOGLE_SHEET_ID>/edit#gid=0`
  - `name` : Sheet name at the bottom of google sheet.
  - `exclude` : List of language codes that you do not want to upload.



## Translate
- Option1) Free Translation
  - Translate with free Google Translate API.
  - An API key is not required, but the number of requests per hour is limited to approximately 100.
- Option2) Paid Translation
  - Translate the source ARB file using [Google Cloud Translation - Base(v2)](https://cloud.google.com/translate/docs/basic/translating-text).
  - A Google API Key is required. Please refer to [the link](https://cloud.google.com/translate/docs/setup) for information on how to obtain the key.

- Translation Rules
  - if the `key` contains `@`, it will not be translated.
  - If the `key` does not exist in the `targetARB` file, preceed with translation.
  - If the `values` retrieved from the `history` and `sourceARB` files using the `key` are different, it is determined that there has been a change and translation is performed.
  - If the `value` in the `history` file and the `value` in `sourceARB` are different, replaces the `value` of the entire `targetARB` with the translation result.
    - `.vscode/flutter-translator/history.json` : A history of the last translated sourceARB to track changes to the `sourceARB` file.
      ```
      {
        "data": {
          "@@locale": "en",
          "helloWorld": "hello world"
          "happyNewYear": "Happy new year",
        }
      }
      ```
  - Google Translator's results are stored in a cache file, and the cache is returned when the same request comes in.
    - `.vscode/flutter-translator/cache.json` : This is a file that caches Google Translate results.
      ```
      {
        "source languageCode": {
          "target languageCode": {
            "SHA-1 of source value" : "translated text"
          }
        }
      }
      ```
- Exclude Translation
  - If there are changes in the `sourceARB` file but you do not want to translate them, run the `Flutter Translator: ARB - Exclude Translation` command.
  - Overwrites the changed `value` of `sourceARB` with `history` so that the value is not translated.
  - However, if the `key` does not exist in the `targetARB` file, translation is performed.

## License
```
MIT License

Copyright (c) 2023 DevStory

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
