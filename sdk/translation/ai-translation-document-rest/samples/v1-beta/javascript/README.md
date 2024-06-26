---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-cognitive-services
  - azure-translator
urlFragment: ai-translation-document-javascript-beta
---

# Azure Document Translation Service client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure Document Translation Service in some common scenarios.

| **File Name**                                                       | **Description**                                                                                                                              |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [batchDocumentTranslation.js][batchdocumenttranslation]             | This sample demonstrates how to make a simple call to the Azure Document Translator service to start a batch translation                     |
| [cancelTranslation.js][canceltranslation]                           | This sample demonstrates how to cancel a batch translation request                                                                           |
| [getDocumentStatus.js][getdocumentstatus]                           | This sample demonstrates how to get the Document status for a given document of a batch translation operation                                |
| [getDocumentsStatus.js][getdocumentsstatus]                         | This sample demonstrates how to get the Documents status of a batch translation operation initiated by a user                                |
| [getSupportedFormats.js][getsupportedformats]                       | This sample demonstrates how to make a simple call to the Azure Document Translator service to get a list of supported languages             |
| [getTranslationStatus.js][gettranslationstatus]                     | This sample demonstrates how to get the Translations Status of a batch translation operation initiated by a user                             |
| [getTranslationsStatus.js][gettranslationsstatus]                   | This sample demonstrates how to get the Translations Status of a batch translation operation initiated by a user                             |
| [synchronousDocumentTranslation.js][synchronousdocumenttranslation] | This sample demonstrates how to make a simple call to the Azure Document Translator service to synchronously start a single file translation |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

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

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node batchDocumentTranslation.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env ENDPOINT="<endpoint>" DOCUMENT_TRANSLATION_API_KEY="<document translation api key>" node batchDocumentTranslation.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[batchdocumenttranslation]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-document-rest/samples/v1-beta/javascript/batchDocumentTranslation.js
[canceltranslation]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-document-rest/samples/v1-beta/javascript/cancelTranslation.js
[getdocumentstatus]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-document-rest/samples/v1-beta/javascript/getDocumentStatus.js
[getdocumentsstatus]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-document-rest/samples/v1-beta/javascript/getDocumentsStatus.js
[getsupportedformats]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-document-rest/samples/v1-beta/javascript/getSupportedFormats.js
[gettranslationstatus]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-document-rest/samples/v1-beta/javascript/getTranslationStatus.js
[gettranslationsstatus]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-document-rest/samples/v1-beta/javascript/getTranslationsStatus.js
[synchronousdocumenttranslation]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-document-rest/samples/v1-beta/javascript/synchronousDocumentTranslation.js
[apiref]: https://learn.microsoft.com/azure/ai-services/translator/document-translation/overview
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecognitiveservicesinstance]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/translation/ai-translation-document-rest/README.md
