---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-cognitive-services
urlFragment: ai-form-recognizer-javascript
---

# Azure Form Recognizer client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Cognitive Services Form Recognizer in some common scenarios.

| **File Name**                                                     | **Description**                                                                                                       |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [recognizeContent.js][recognizecontent]                           | Recognize text and table structures of a document                                                                     |
| [recognizeReceipt.js][recognizereceipt]                           | Recognize data from a file of a US sales receipt using a prebuilt model                                               |
| [recognizeReceiptFromUrl.js][recognizereceiptfromurl]             | Recognize data from a URL of a US sales receipt using a prebuilt model                                                |
| [recognizeCustomForm.js][recognizecustomform]                     | Recognize forms with your custom model                                                                                |
| [trainLabeledModel.js][trainlabeledmodel]                         | Train a custom model with labeled data                                                                                |
| [trainUnlabeledModel.js][trainunlabeledmodel]                     | Train a custom model with unlabeled data                                                                              |
| [customModelManagement.js][custommodelmanagement]                 | Manage the custom models in your account                                                                              |
| [iteratorModels.js][iteratormodels]                               | List custom models using different ways                                                                               |
| [getBoundingBoxes.js][getboundingboxes]                           | Get information to to visualize outlines of form content and field.                                                   |
| [differentiateLabeledUnlabeled.js][differentiatelabeledunlabeled] | See the differences in output when using a custom model trained with labeled data and one trained with unlabeled data |
| [copyModel.js][copymodel]                                         | Copy a custom model from one Form Recognizer resource to another                                                      |
| [authenticationMethods.js][authenticationmethods]                 | authenticates a service client using both Azure Active Directory and an API key                                       |

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

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Not all environment variables are required. Read the relevant sample sources and the `sample.env` file to determine which ones are required. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like:

```bash
node recognizeReceipt.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[recognizereceipt]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/javascript/recognizeReceipt.js
[recognizereceiptfromurl]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/javascript/recognizeReceiptFromUrl.js
[recognizecontent]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/javascript/recognizeContent.js
[recognizecustomform]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/javascript/recognizeCustomForm.js
[trainlabeledmodel]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/javascript/trainLabeledModel.js
[trainunlabeledmodel]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/javascript/trainUnlabeledModel.js
[custommodelmanagement]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/javascript/customModelManagement.js
[iteratormodels]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/javascript/iteratorModels.js
[getboundingboxes]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/javascript/getBoundingBoxes.js
[differentiatelabeledunlabeled]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/javascript/differentiateLabeledUnlabeled.js
[copymodel]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/javascript/copyModel.js
[authenticationmethods]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples/javascript/authenticationMethods.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/ai-form-recognizer
[azcogsvc]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/README.md
