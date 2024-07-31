---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-cognitive-services
  - azure-translator
urlFragment: ai-translation-document-typescript-beta
---

# Azure Document Translation Service client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure Document Translation Service in some common scenarios.

| **File Name**                                                       | **Description**                                                                                                                              |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [batchDocumentTranslation.ts][batchdocumenttranslation]             | This sample demonstrates how to make a simple call to the Azure Document Translator service to start a batch translation                     |
| [cancelTranslation.ts][canceltranslation]                           | This sample demonstrates how to cancel a batch translation request                                                                           |
| [getDocumentStatus.ts][getdocumentstatus]                           | This sample demonstrates how to get the Document status for a given document of a batch translation operation                                |
| [getDocumentsStatus.ts][getdocumentsstatus]                         | This sample demonstrates how to get the Documents status of a batch translation operation initiated by a user                                |
| [getSupportedFormats.ts][getsupportedformats]                       | This sample demonstrates how to make a simple call to the Azure Document Translator service to get a list of supported languages             |
| [getTranslationStatus.ts][gettranslationstatus]                     | This sample demonstrates how to get the Translations Status of a batch translation operation initiated by a user                             |
| [getTranslationsStatus.ts][gettranslationsstatus]                   | This sample demonstrates how to get the Translations Status of a batch translation operation initiated by a user                             |
| [synchronousDocumentTranslation.ts][synchronousdocumenttranslation] | This sample demonstrates how to make a simple call to the Azure Document Translator service to synchronously start a single file translation |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

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
node dist/batchDocumentTranslation.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env ENDPOINT="<endpoint>" DOCUMENT_TRANSLATION_API_KEY="<document translation api key>" node dist/batchDocumentTranslation.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[batchdocumenttranslation]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-document-rest/samples/v1-beta/typescript/src/batchDocumentTranslation.ts
[canceltranslation]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-document-rest/samples/v1-beta/typescript/src/cancelTranslation.ts
[getdocumentstatus]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-document-rest/samples/v1-beta/typescript/src/getDocumentStatus.ts
[getdocumentsstatus]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-document-rest/samples/v1-beta/typescript/src/getDocumentsStatus.ts
[getsupportedformats]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-document-rest/samples/v1-beta/typescript/src/getSupportedFormats.ts
[gettranslationstatus]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-document-rest/samples/v1-beta/typescript/src/getTranslationStatus.ts
[gettranslationsstatus]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-document-rest/samples/v1-beta/typescript/src/getTranslationsStatus.ts
[synchronousdocumenttranslation]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-document-rest/samples/v1-beta/typescript/src/synchronousDocumentTranslation.ts
[apiref]: https://learn.microsoft.com/azure/ai-services/translator/document-translation/overview
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecognitiveservicesinstance]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/translation/ai-translation-document-rest/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
