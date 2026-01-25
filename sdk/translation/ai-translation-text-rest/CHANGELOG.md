# Release History

## 2.0.0-beta.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 2.0.0-beta.1 (2026-01-08)

### Features Added

- Added support for the Azure AI Translator API 2025-10-01-preview, including translations using LLM models, adaptive custom translation, tone variant translations, and gender-specific translations.
- Added `TranslationTarget` for configuring translation options.

### Breaking Changes

- Added `Models` property to `GetSupportedLanguagesResultOutput` to list the LLM models available for translations.
- Removed `transliteration` in `TranslationTextOutput`.
- Removed `sourceText` in `TranslatedTextItemOutput`.
- Dictionary, sentence boundaries and text alignments features have been deprecated and relevant classes and properties have been removed.

### Other Changes

- Updated dependencies to latest versions

## 1.0.2 (2025-08-22)

### Other Changes

  - Other fixes

## 1.0.1 (2025-02-10)

### Features Added
- refresh @azure-rest/ai-translation-text sdk

## 1.0.0 (2024-05-21)

### Features Added
- Added support for AAD authentication.

## 1.0.0-beta.1 (2023-04-18)
Initial release

### Features Added
- Added support for Text Translation - [Translate API](https://learn.microsoft.com/azure/cognitive-services/translator/reference/v3-0-translate)
- Added support for Text Transliteration - [Transliterate API](https://learn.microsoft.com/azure/cognitive-services/translator/reference/v3-0-transliterate)
- Added support for Finding Sentence Boundaries - [FindSentenceBoundaries API](https://learn.microsoft.com/azure/cognitive-services/translator/reference/v3-0-break-sentence)
- Added support for Getting the Supported Languages - [GetLanguages API](https://learn.microsoft.com/azure/cognitive-services/translator/reference/v3-0-languages)
- Added support for Looking up the Dictionary Entries - [LookupDictionaryEntries API](https://learn.microsoft.com/azure/cognitive-services/translator/reference/v3-0-dictionary-lookup)
- Added support for Looking up the Dictionary Examples - [LookupDictionaryExamples API](https://learn.microsoft.com/azure/cognitive-services/translator/reference/v3-0-dictionary-examples)
