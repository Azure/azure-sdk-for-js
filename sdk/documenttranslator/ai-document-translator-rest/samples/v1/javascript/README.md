---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-cognitive-services
  - azure-translator
urlFragment: ai-document-translator-javascript
disableDocsMs: true
---

# Azure Document Translator rest client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Document Translator rest in some common scenarios.

| **File Name**                             | **Description**                               |
| ----------------------------------------- | --------------------------------------------- |
| [listFormats.js][listformats]             | gets a list of all supported document formats |
| [translateFromBlob.js][translatefromblob] | translates a collection of documents          |

## Prerequisites

The sample programs are compatible with Node.js >=12.0.0.

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
node listFormats.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env ENDPOINT="<endpoint>" DOCUMENT_TRANSLATOR_API_KEY="<document translator api key>" node listFormats.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[listformats]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/documenttranslator/ai-document-translator-rest/samples/v1/javascript/listFormats.js
[translatefromblob]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/documenttranslator/ai-document-translator-rest/samples/v1/javascript/translateFromBlob.js
[apiref]: https://learn.microsoft.com/azure/cognitive-services/translator/document-translation/overview
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecognitiveservicesinstance]: https://learn.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/documenttranslator/ai-document-translator-rest/README.md
