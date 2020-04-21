# Azure Form Recognizer client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Cognitive Services Text Analytics in some common scenarios.


|**File Name**|**Description**|
|----------------|-------------|
|[recognizeReceipt.ts][recognizeReceipt]|Recognize data from a file of a US sales receipt using a prebuilt model|
|[recognizeReceiptFromUrl.ts][recognizeReceiptFromUrl]|Recognize data from a URL of a US sales receipt using a prebuilt model|
|[recognizeContent.ts][recognizeContent]|Recognize text and table structures of a document|
|[recognizeCustomForm.ts][recognizeCustomForm]|Recognize forms with your custom model|
|[trainLabeledModel.ts][trainLabeledModel]|Train a custom model with labeled data|
|[trainUnlabeledModel.ts][trainUnlabeledModel]|Train a custom model with unlabeled data|
|[customModelManagement.ts][customModelManagement]|Manage the custom models in your account|
|[iteratorModels.ts][iteratorModels]|List custom models using different ways|
|[getValidationInfo.ts][getValidationInfo]|Get information to help with manually validating recognition results|
|[differentiateLabeledUnlabeled.ts][differentiateLabeledUnlabeled]|See the differences in output when using a custom model trained with labeled data and one trained with unlabeled data|                 |

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

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Add additional environment variables specified in the sample file you wish to run.

5. Change directory to `dist`

```bash
cd dist
```

6. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node recognizeReceipt.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[recognizeReceipt]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/typescript/src/recognizeReceipt.ts
[recognizeReceiptFromUrl]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/typescript/src/recognizeReceiptFromUrl.ts
[recognizeContent]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/typescript/src/recognizeContent.ts
[recognizeCustomForm]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/typescript/src/recognizeCustomForm.ts
[trainLabeledModel]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/typescript/src/trainLabeledModel.ts
[trainUnlabeledModel]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/typescript/src/trainUnlabeledModel.ts
[customModelManagement]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/typescript/src/customModelManagement.ts
[iteratorModels]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/typescript/src/iteratorModels.ts
[getValidationInfo]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/typescript/src/getValidationInfo.ts
[differentiateLabeledUnlabeled]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/typescript/src/differentiateLabeledUnlabeled.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/ai-text-analytics
[azcogsvc]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/textanalytics/ai-text-analytics/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
