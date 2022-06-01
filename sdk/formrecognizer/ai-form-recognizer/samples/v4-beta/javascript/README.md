---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-cognitive-services
  - azure-form-recognizer
urlFragment: ai-form-recognizer-javascript-beta
---

# Azure Form Recognizer client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure Form Recognizer in some common scenarios.

| **File Name**                                           | **Description**                                                                            |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [composeModel.js][composemodel]                         | create a composed model from several individual labeled models                             |
| [analyzeBusinessCard.js][analyzebusinesscard]           | extract data from a business card document                                                 |
| [analyzeDocumentByModelId.js][analyzedocumentbymodelid] | analyze a document using a model by ID                                                     |
| [analyzeIdentityDocument.js][analyzeidentitydocument]   | extract data from an identity document                                                     |
| [analyzeInvoice.js][analyzeinvoice]                     | extract data from an invoice document                                                      |
| [analyzeReceipt.js][analyzereceipt]                     | extract data from a receipt document                                                       |
| [analyzeReceiptByModelId.js][analyzereceiptbymodelid]   | use the "prebuilt-receipt" model ID to extract data from a receipt document (weakly-typed) |
| [analyzeW2TaxForm.js][analyzew2taxform]                 | extract data from a United States W2 tax document                                          |
| [buildModel.js][buildmodel]                             | build a model with a single document type from a training data set                         |
| [copyModel.js][copymodel]                               | copy a model from one resource to another                                                  |
| [extractGeneralDocument.js][extractgeneraldocument]     | use the prebuilt (general) document model to extract key-value pairs and entities          |
| [extractLayout.js][extractlayout]                       | use the prebuilt layout model to extract basic document elements only                      |
| [getInfo.js][getinfo]                                   | get information about the count and limit of custom models in the resource                 |
| [getModel.js][getmodel]                                 | get information about a model by its ID                                                    |
| [listModels.js][listmodels]                             | iterate over the models in a resource                                                      |
| [readDocument.js][readdocument]                         | use the prebuilt "read" model to extract information about the text content of a document  |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Cognitive Services account][createinstance_azurecognitiveservicesaccount]

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
node composeModel.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env FORM_RECOGNIZER_ENDPOINT="<form recognizer endpoint>" FORM_RECOGNIZER_API_KEY="<form recognizer api key>" PURCHASE_ORDER_SUPPLIES_SAS_URL="<purchase order supplies sas url>" PURCHASE_ORDER_EQUIPMENT_SAS_URL="<purchase order equipment sas url>" PURCHASE_ORDER_FURNITURE_SAS_URL="<purchase order furniture sas url>" PURCHASE_ORDER_CLEANING_SUPPLIES_SAS_URL="<purchase order cleaning supplies sas url>" node composeModel.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[composemodel]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/javascript/composeModel.js
[analyzebusinesscard]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/javascript/analyzeBusinessCard.js
[analyzedocumentbymodelid]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/javascript/analyzeDocumentByModelId.js
[analyzeidentitydocument]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/javascript/analyzeIdentityDocument.js
[analyzeinvoice]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/javascript/analyzeInvoice.js
[analyzereceipt]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/javascript/analyzeReceipt.js
[analyzereceiptbymodelid]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/javascript/analyzeReceiptByModelId.js
[analyzew2taxform]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/javascript/analyzeW2TaxForm.js
[buildmodel]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/javascript/buildModel.js
[copymodel]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/javascript/copyModel.js
[extractgeneraldocument]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/javascript/extractGeneralDocument.js
[extractlayout]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/javascript/extractLayout.js
[getinfo]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/javascript/getInfo.js
[getmodel]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/javascript/getModel.js
[listmodels]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/javascript/listModels.js
[readdocument]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/javascript/readDocument.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/ai-form-recognizer
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecognitiveservicesaccount]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/formrecognizer/ai-form-recognizer/README.md
