# Azure Form Recognizer client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Form Recognizer in some common scenarios.

| **File Name**                                                     | **Description**                                                                                                                |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [recognizeCustomForm.ts][recognizecustomform]                     | extract information from forms using a custom trained model                                                                    |
| [recognizeReceipt.ts][recognizereceipt]                           | extract data from an image of a receipt                                                                                        |
| [recognizeBusinessCard.ts][recognizebusinesscard]                 | extract data from an image of a business card                                                                                  |
| [recognizeIdDocument.ts][recognizeiddocument]                     | extract data from an image of a identity document                                                                              |
| [recognizeInvoice.ts][recognizeinvoice]                           | extract data from an image of a invoice                                                                                        |
| [recognizeContent.ts][recognizecontent]                           | extract layout information such as text lines and table structures from a document                                             |
| [recognizeReceiptFromUrl.ts][recognizereceiptfromurl]             | extract data from a receipt by providing a URL to a file rather than a file stream directly                                    |
| [trainLabeledModel.ts][trainlabeledmodel]                         | train a custom model with labeled inputs                                                                                       |
| [trainUnlabeledModel.ts][trainunlabeledmodel]                     | train a custom model with unlabeled inputs (form documents only)                                                               |
| [differentiateLabeledUnlabeled.ts][differentiatelabeledunlabeled] | see the differences in custom model recognition using labeled and unlabeled training documents                                 |
| [getBoundingBoxes.ts][getboundingboxes]                           | display information about the outlines of form content and fields in a document                                                |
| [copyModel.ts][copymodel]                                         | copy a custom model from one Form Recognizer resource to another                                                               |
| [createComposedModel.ts][createcomposedmodel]                     | create a composed model from several individual labeled models                                                                 |
| [authenticationMethods.ts][authenticationmethods]                 | authenticate a service client using both Azure Active Directory and an API key                                                 |
| [customModelManagement.ts][custommodelmanagement]                 | display information about your account and its models                                                                          |
| [iteratorModels.ts][iteratormodels]                               | list custom models using several different methods of iteration                                                                |
| [stronglyTypingRecognizedForm.ts][stronglytypingrecognizedform]   | create a strongly-typed interface for a model with a known structure and use it to refine the output type of model recognition |
| [deleteAllModels.ts][deleteallmodels]                             | delete all the models in a Form Recognizer account                                                                             |

## Prerequisites

The sample programs are compatible with Node.js >=12.0.0.

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
node dist/recognizeCustomForm.ts
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env FORM_RECOGNIZER_ENDPOINT="<form recognizer endpoint>" FORM_RECOGNIZER_API_KEY="<form recognizer api key>" CUSTOM_MODEL_ID="<custom model id>" node dist/recognizeCustomForm.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[recognizecustomform]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/typescript/src/recognizeCustomForm.ts
[recognizereceipt]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/typescript/src/recognizeReceipt.ts
[recognizebusinesscard]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/typescript/src/recognizeBusinessCard.ts
[recognizeiddocument]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/typescript/src/recognizeIdDocument.ts
[recognizeinvoice]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/typescript/src/recognizeInvoice.ts
[recognizecontent]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/typescript/src/recognizeContent.ts
[recognizereceiptfromurl]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/typescript/src/recognizeReceiptFromUrl.ts
[trainlabeledmodel]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/typescript/src/trainLabeledModel.ts
[trainunlabeledmodel]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/typescript/src/trainUnlabeledModel.ts
[differentiatelabeledunlabeled]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/typescript/src/differentiateLabeledUnlabeled.ts
[getboundingboxes]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/typescript/src/getBoundingBoxes.ts
[copymodel]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/typescript/src/copyModel.ts
[createcomposedmodel]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/typescript/src/createComposedModel.ts
[authenticationmethods]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/typescript/src/authenticationMethods.ts
[custommodelmanagement]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/typescript/src/customModelManagement.ts
[iteratormodels]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/typescript/src/iteratorModels.ts
[stronglytypingrecognizedform]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/typescript/src/stronglyTypingRecognizedForm.ts
[deleteallmodels]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/typescript/src/deleteAllModels.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/ai-form-recognizer
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecognitiveservicesaccount]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
