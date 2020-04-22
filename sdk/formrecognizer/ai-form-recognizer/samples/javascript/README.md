# Azure Form Recognizer client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Cognitive Services Form Recognizer in some common scenarios.

|**File Name**|**Description**|
|----------------|-------------|
|[recognizeContent.js][recognizeContent]|Recognize text and table structures of a document|
|[recognizeReceipt.js][recognizeReceipt]|Recognize data from a file of a US sales receipt using a prebuilt model|
|[recognizeReceiptFromUrl.js][recognizeReceiptFromUrl]|Recognize data from a URL of a US sales receipt using a prebuilt model|
|[recognizeCustomForm.js][recognizeCustomForm]|Recognize forms with your custom model|
|[trainLabeledModel.js][trainLabeledModel]|Train a custom model with labeled data|
|[trainUnlabeledModel.js][trainUnlabeledModel]|Train a custom model with unlabeled data|
|[customModelManagement.js][customModelManagement]|Manage the custom models in your account|
|[iteratorModels.js][iteratorModels]|List custom models using different ways|
|[getBoundingBoxes.js][getBoundingBoxes]|Get information to to visualize outlines of form content and field.|
|[differentiateLabeledUnlabeled.js][differentiateLabeledUnlabeled]|See the differences in output when using a custom model trained with labeled data and one trained with unlabeled data|

## Prerequisites

The samples are compatible with Node.js >= 8.0.0.

You need [an Azure subscription][freesub] and [an Azure Cognitive Services Instance][azcogsvc] to run these sample programs. Samples retrieve credentials to access the Cognitive Services endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```
2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Add additional environment variables specified in the sample file you wish to run.

4. Run whichever samples you like:

```bash
node recognizeReceipt.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[recognizeReceipt]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/javascript/recognizeReceipt.js
[recognizeReceiptFromUrl]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/javascript/recognizeReceiptFromUrl.js
[recognizeContent]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/javascript/recognizeContent.js
[recognizeCustomForm]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/javascript/recognizeCustomForm.js
[trainLabeledModel]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/javascript/trainLabeledModel.js
[trainUnlabeledModel]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/javascript/trainUnlabeledModel.js
[customModelManagement]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/javascript/customModelManagement.js
[iteratorModels]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/javascript/iteratorModels.js
[getBoundingBoxes]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/javascript/getBoundingBoxes.js
[differentiateLabeledUnlabeled]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/javascript/differentiateLabeledUnlabeled.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/ai-form-recognizer
[azcogsvc]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/README.md
