---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-cognitive-services
  - azure-translator
urlFragment: ai-translation-document-javascript
---

# Azure Document Translation Service client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Document Translation Service in some common scenarios.

| **File Name**                                                       | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [batchDocumentTranslation.js][batchdocumenttranslation]             | This sample demonstrates how to perform batch document translation using the Azure Document Translation service. It uploads a PDF file to an Azure Blob Storage container, initiates the translation process, and downloads the translated file. The sample uses the Azure SDK for JavaScript to interact with the Document Translation service and Azure Blob Storage. It requires the following environment variables to be set: - DOCUMENT_TRANSLATION_ENDPOINT: The endpoint URL for the Document Translation service. - STORAGE_BLOB_ENDPOINT: The endpoint URL for the Azure Blob Storage account. - TRANSLATION_FILE: The URL of the PDF file to be translated. |
| [getSupportedFormats.js][getsupportedformats]                       | This sample demonstrates how to get the supported formats for document translation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| [synchronousDocumentTranslation.js][synchronousdocumenttranslation] | This sample demonstrates how to use the Document Translation client to perform a synchronous document translation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

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
cross-env DOCUMENT_TRANSLATION_ENDPOINT="<document translation endpoint>" STORAGE_BLOB_ENDPOINT="<storage blob endpoint>" TRANSLATION_FILE="<translation file>" node batchDocumentTranslation.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[batchdocumenttranslation]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-document-rest/samples/v1/javascript/batchDocumentTranslation.js
[getsupportedformats]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-document-rest/samples/v1/javascript/getSupportedFormats.js
[synchronousdocumenttranslation]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-document-rest/samples/v1/javascript/synchronousDocumentTranslation.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure-rest/ai-translation-document
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecognitiveservicesinstance]: https://learn.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/translation/ai-translation-document-rest/README.md
