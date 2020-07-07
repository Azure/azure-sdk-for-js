---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-cognitive-services
urlFragment: ai-form-recognizer-typescript
---

# Azure Form Recognizer client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Cognitive Services Form Recognizer in some common scenarios.

| **File Name**                                                     | **Description**                                                                                                                                          |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [recognizeContent.ts][recognizecontent]                           | Recognize text and table structures of a document                                                                                                        |
| [recognizeReceipt.ts][recognizereceipt]                           | Recognize data from a file of a US sales receipt using a prebuilt model                                                                                  |
| [recognizeReceiptFromUrl.ts][recognizereceiptfromurl]             | Recognize data from a URL of a US sales receipt using a prebuilt model                                                                                   |
| [recognizeCustomForm.ts][recognizecustomform]                     | Recognize forms with your custom model                                                                                                                   |
| [trainLabeledModel.ts][trainlabeledmodel]                         | Train a custom model with labeled data                                                                                                                   |
| [trainUnlabeledModel.ts][trainunlabeledmodel]                     | Train a custom model with unlabeled data                                                                                                                 |
| [customModelManagement.ts][custommodelmanagement]                 | Manage the custom models in your account                                                                                                                 |
| [iteratorModels.ts][iteratormodels]                               | List custom models using different ways                                                                                                                  |
| [getBoundingBoxes.ts][getboundingboxes]                           | Get information to to visualize outlines of form content and field.                                                                                      |
| [differentiateLabeledUnlabeled.ts][differentiatelabeledunlabeled] | See the differences in output when using a custom model trained with labeled data and one trained with unlabeled data                                    |
| [copyModel.ts][copymodel]                                         | Copy a custom model from one Form Recognizer resource to another                                                                                         |
| [stronglyTypingRecognizedForm.ts][stronglytypingrecognizedform]   | Create a strongly-typed interface representing a receipt, or any model with a known structure, and use it to refine the output type of model recognition |
| [authenticationMethods.ts][authenticationmethods]                 | authenticates a service client using both Azure Active Directory and an API key                                                                          |

## Prerequisites

The samples are compatible with Node.js >= 8.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and [an Azure Cognitive Services Instance][azcogsvc] to run these sample programs. Samples retrieve credentials to access the Cognitive Services endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Not all environment variables are required. Read the relevant sample sources and the `sample.env` file to determine which ones are required. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/recognizeReceipt.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[recognizereceipt]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/typescript/src/recognizeReceipt.ts
[recognizereceiptfromurl]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/typescript/src/recognizeReceiptFromUrl.ts
[recognizecontent]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/typescript/src/recognizeContent.ts
[recognizecustomform]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/typescript/src/recognizeCustomForm.ts
[trainlabeledmodel]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/typescript/src/trainLabeledModel.ts
[trainunlabeledmodel]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/typescript/src/trainUnlabeledModel.ts
[custommodelmanagement]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/typescript/src/customModelManagement.ts
[iteratormodels]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/typescript/src/iteratorModels.ts
[getboundingboxes]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/typescript/src/getBoundingBoxes.ts
[differentiatelabeledunlabeled]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/typescript/src/differentiateLabeledUnlabeled.ts
[copymodel]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/typescript/src/copyModel.ts
[stronglytypingrecognizedform]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/typescript/src/stronglyTypingRecognizedForm.ts
[authenticationmethods]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/typescript/src/authenticationMethods.ts
[apiref]: https://aka.ms/azsdk/js/formrecognizer/docs
[azcogsvc]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
