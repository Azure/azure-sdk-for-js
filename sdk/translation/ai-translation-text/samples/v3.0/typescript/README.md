---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-cognitive-services
  - azure-translator
urlFragment: ai-translation-text-typescript
disableDocsMs: true
---

# Azure Text Translator rest client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Text Translator rest in some common scenarios.

| **File Name**                                                         | **Description**                               |
| ----------------------------------------- | --------------------------------------------- |
| [breakSentence.ts][breakSentence]                                     | Get Sentence Boundaries |
| [breakSentenceWithAutoDetection.ts][breakSentenceWithAutoDetection]   | Get Sentence Boundaries with auto-detection |
| [dictionaryExamples.ts][dictionaryExamples]                           | Dictionary Examples Sample |
| [dictionaryLookup.ts][dictionaryLookup]                               | Dictionary Lookup Sample |
| [getLanguages.ts][getLanguages]                                       | gets a list of all supported languages |
| [getLanguagesAcceptLanguage.ts][getLanguagesAcceptLanguage]           | gets a list of all supported languages in given locale |
| [getLanguagesScope.ts][getLanguagesScope]                             | gets a list of all supported languages for selected scope |
| [translate.ts][translate]                                             | simple translate text |
| [translateAlignments.ts][translateAlignments]                         | translation with alignments |
| [translateCustom.ts][translateCustom]                                 | Translate with Custom system |
| [translateDetection.ts][translateDetection]                           | simple translate text with auto-detection |
| [translateDictionary.ts][translateDictionary]                         | Translate with dictionary |
| [translateMultipleSources.ts][translateMultipleSources]               | multiple input texts |
| [translateMultipleTargets.ts][translateMultipleTargets]               | multiple target languages translation |
| [translateNoTranslate.ts][translateNoTranslate]                       | mark text with no translate div |
| [translateProfanity.ts][translateProfanity]                           | Profanity handling |
| [translateSenteceLength.ts][translateSenteceLength]                   | translation with sentence boundaries |
| [translateTextType.ts][translateTextType]                             | HTML translation |
| [translateWithTransliteration.ts][translateWithTransliteration]       | translate text with transliteration |
| [transliterate.ts][transliterate]                                     | simple transliterate call |

## Prerequisites

The sample programs are compatible with Node.js >=12.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Cognitive Services instance][createinstance_azurecognitiveservicesinstance]

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/translate.ts
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env ENDPOINT="<endpoint>" TEXT_TRANSLATOR_API_KEY="<text translator api key>" TEXT_TRANSLATOR_REGION="<text translator region>" node dist/translate.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[breakSentence]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-text/samples/v3.0/typescript/src/breakSentence.ts
[breakSentenceWithAutoDetection]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-text/samples/v3.0/typescript/src/breakSentenceWithAutoDetection.ts
[dictionaryExamples]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-text/samples/v3.0/typescript/src/dictionaryExamples.ts
[dictionaryLookup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-text/samples/v3.0/typescript/src/dictionaryLookup.ts
[getLanguages]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-text/samples/v3.0/typescript/src/getLanguages.ts
[getLanguagesAcceptLanguage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-text/samples/v3.0/typescript/src/getLanguagesAcceptLanguage.ts
[getLanguagesScope]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-text/samples/v3.0/typescript/src/getLanguagesScope.ts
[translate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-text/samples/v3.0/typescript/src/translate.ts
[translateAlignments]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-text/samples/v3.0/typescript/src/translateAlignments.ts
[translateCustom]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-text/samples/v3.0/typescript/src/translateCustom.ts
[translateDetection]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-text/samples/v3.0/typescript/src/translateDetection.ts
[translateDictionary]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-text/samples/v3.0/typescript/src/translateDictionary.ts
[translateMultipleSources]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-text/samples/v3.0/typescript/src/translateMultipleSources.ts
[translateMultipleTargets]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-text/samples/v3.0/typescript/src/translateMultipleTargets.ts
[translateNoTranslate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-text/samples/v3.0/typescript/src/translateNoTranslate.ts
[translateProfanity]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-text/samples/v3.0/typescript/src/translateProfanity.ts
[translateSenteceLength]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-text/samples/v3.0/typescript/src/translateSenteceLength.ts
[translateTextType]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-text/samples/v3.0/typescript/src/translateTextType.ts
[translateWithTransliteration]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-text/samples/v3.0/typescript/src/translateWithTransliteration.ts
[transliterate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-text/samples/v3.0/typescript/src/transliterate.ts

[apiref]: https://learn.microsoft.com/en-us/azure/cognitive-services/translator/reference/v3-0-translate
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecognitiveservicesinstance]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[package]: https://github.com/MikeyMCZ/azure-sdk-for-js/tree/main/sdk/translation/ai-translation-text/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
