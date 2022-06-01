---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-cognitive-services
  - azure-form-recognizer
urlFragment: ai-form-recognizer-typescript-beta
---

# Azure Form Recognizer client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure Form Recognizer in some common scenarios.

| **File Name**                                           | **Description**                                                                            |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [composeModel.ts][composemodel]                         | create a composed model from several individual labeled models                             |
| [analyzeBusinessCard.ts][analyzebusinesscard]           | extract data from a business card document                                                 |
| [analyzeDocumentByModelId.ts][analyzedocumentbymodelid] | analyze a document using a model by ID                                                     |
| [analyzeIdentityDocument.ts][analyzeidentitydocument]   | extract data from an identity document                                                     |
| [analyzeInvoice.ts][analyzeinvoice]                     | extract data from an invoice document                                                      |
| [analyzeReceipt.ts][analyzereceipt]                     | extract data from a receipt document                                                       |
| [analyzeReceiptByModelId.ts][analyzereceiptbymodelid]   | use the "prebuilt-receipt" model ID to extract data from a receipt document (weakly-typed) |
| [analyzeW2TaxForm.ts][analyzew2taxform]                 | extract data from a United States W2 tax document                                          |
| [buildModel.ts][buildmodel]                             | build a model with a single document type from a training data set                         |
| [copyModel.ts][copymodel]                               | copy a model from one resource to another                                                  |
| [extractGeneralDocument.ts][extractgeneraldocument]     | use the prebuilt (general) document model to extract key-value pairs and entities          |
| [extractLayout.ts][extractlayout]                       | use the prebuilt layout model to extract basic document elements only                      |
| [getInfo.ts][getinfo]                                   | get information about the count and limit of custom models in the resource                 |
| [getModel.ts][getmodel]                                 | get information about a model by its ID                                                    |
| [listModels.ts][listmodels]                             | iterate over the models in a resource                                                      |
| [readDocument.ts][readdocument]                         | use the prebuilt "read" model to extract information about the text content of a document  |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

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

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/composeModel.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env FORM_RECOGNIZER_ENDPOINT="<form recognizer endpoint>" FORM_RECOGNIZER_API_KEY="<form recognizer api key>" PURCHASE_ORDER_SUPPLIES_SAS_URL="<purchase order supplies sas url>" PURCHASE_ORDER_EQUIPMENT_SAS_URL="<purchase order equipment sas url>" PURCHASE_ORDER_FURNITURE_SAS_URL="<purchase order furniture sas url>" PURCHASE_ORDER_CLEANING_SUPPLIES_SAS_URL="<purchase order cleaning supplies sas url>" node dist/composeModel.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[composemodel]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/typescript/src/composeModel.ts
[analyzebusinesscard]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/typescript/src/analyzeBusinessCard.ts
[analyzedocumentbymodelid]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/typescript/src/analyzeDocumentByModelId.ts
[analyzeidentitydocument]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/typescript/src/analyzeIdentityDocument.ts
[analyzeinvoice]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/typescript/src/analyzeInvoice.ts
[analyzereceipt]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/typescript/src/analyzeReceipt.ts
[analyzereceiptbymodelid]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/typescript/src/analyzeReceiptByModelId.ts
[analyzew2taxform]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/typescript/src/analyzeW2TaxForm.ts
[buildmodel]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/typescript/src/buildModel.ts
[copymodel]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/typescript/src/copyModel.ts
[extractgeneraldocument]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/typescript/src/extractGeneralDocument.ts
[extractlayout]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/typescript/src/extractLayout.ts
[getinfo]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/typescript/src/getInfo.ts
[getmodel]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/typescript/src/getModel.ts
[listmodels]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/typescript/src/listModels.ts
[readdocument]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/typescript/src/readDocument.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/ai-form-recognizer
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecognitiveservicesaccount]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/formrecognizer/ai-form-recognizer/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
