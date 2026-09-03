# Azure Document Intelligence Rest Client client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Document Intelligence Rest Client in some common scenarios.

| **File Name**                                           | **Description**                                                                            |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [composeModel.ts][composemodel]                         | create a composed model from several individual labeled models                             |
| [analyzeDocumentByModelId.ts][analyzedocumentbymodelid] | analyze a document using a model by ID                                                     |
| [analyzeIdentityDocument.ts][analyzeidentitydocument]   | extract data from an identity document                                                     |
| [analyzeInvoice.ts][analyzeinvoice]                     | extract data from an invoice document                                                      |
| [analyzeReceipt.ts][analyzereceipt]                     | extract data from a receipt document                                                       |
| [analyzeReceiptByModelId.ts][analyzereceiptbymodelid]   | use the "prebuilt-receipt" model ID to extract data from a receipt document (weakly-typed) |
| [analyzeW2TaxForm.ts][analyzew2taxform]                 | extract data from a United States W2 tax document                                          |
| [buildClassifier.ts][buildclassifier]                   | build a classifier from a training data set                                                |
| [buildModel.ts][buildmodel]                             | build a model with a single document type from a training data set                         |
| [classifyDocument.ts][classifydocument]                 | use a custom classifier to classify a document                                             |
| [copyModel.ts][copymodel]                               | copy a model from one resource to another                                                  |
| [extractLayout.ts][extractlayout]                       | use the prebuilt layout model to extract basic document elements only                      |
| [getClassifier.ts][getclassifier]                       | get information about a classifier by its ID                                               |
| [getInfo.ts][getinfo]                                   | get information about the count and limit of custom models in the resource                 |
| [getModel.ts][getmodel]                                 | get information about a model by its ID                                                    |
| [listModels.ts][listmodels]                             | iterate over the models in a resource                                                      |
| [readDocument.ts][readdocument]                         | use the prebuilt "read" model to extract information about the text content of a document  |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs.

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
cross-env DOCUMENT_INTELLIGENCE_ENDPOINT="<document intelligence endpoint>" PURCHASE_ORDER_SUPPLIES_SAS_URL="<purchase order supplies sas url>" PURCHASE_ORDER_EQUIPMENT_SAS_URL="<purchase order equipment sas url>" PURCHASE_ORDER_FURNITURE_SAS_URL="<purchase order furniture sas url>" PURCHASE_ORDER_CLEANING_SUPPLIES_SAS_URL="<purchase order cleaning supplies sas url>" node dist/composeModel.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[composemodel]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/documentintelligence/ai-document-intelligence-rest/samples/v1/typescript/src/composeModel.ts
[analyzedocumentbymodelid]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/documentintelligence/ai-document-intelligence-rest/samples/v1/typescript/src/analyzeDocumentByModelId.ts
[analyzeidentitydocument]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/documentintelligence/ai-document-intelligence-rest/samples/v1/typescript/src/analyzeIdentityDocument.ts
[analyzeinvoice]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/documentintelligence/ai-document-intelligence-rest/samples/v1/typescript/src/analyzeInvoice.ts
[analyzereceipt]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/documentintelligence/ai-document-intelligence-rest/samples/v1/typescript/src/analyzeReceipt.ts
[analyzereceiptbymodelid]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/documentintelligence/ai-document-intelligence-rest/samples/v1/typescript/src/analyzeReceiptByModelId.ts
[analyzew2taxform]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/documentintelligence/ai-document-intelligence-rest/samples/v1/typescript/src/analyzeW2TaxForm.ts
[buildclassifier]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/documentintelligence/ai-document-intelligence-rest/samples/v1/typescript/src/buildClassifier.ts
[buildmodel]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/documentintelligence/ai-document-intelligence-rest/samples/v1/typescript/src/buildModel.ts
[classifydocument]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/documentintelligence/ai-document-intelligence-rest/samples/v1/typescript/src/classifyDocument.ts
[copymodel]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/documentintelligence/ai-document-intelligence-rest/samples/v1/typescript/src/copyModel.ts
[extractlayout]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/documentintelligence/ai-document-intelligence-rest/samples/v1/typescript/src/extractLayout.ts
[getclassifier]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/documentintelligence/ai-document-intelligence-rest/samples/v1/typescript/src/getClassifier.ts
[getinfo]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/documentintelligence/ai-document-intelligence-rest/samples/v1/typescript/src/getInfo.ts
[getmodel]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/documentintelligence/ai-document-intelligence-rest/samples/v1/typescript/src/getModel.ts
[listmodels]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/documentintelligence/ai-document-intelligence-rest/samples/v1/typescript/src/listModels.ts
[readdocument]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/documentintelligence/ai-document-intelligence-rest/samples/v1/typescript/src/readDocument.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure-rest/ai-document-intelligence
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/documentintelligence/ai-document-intelligence-rest/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
