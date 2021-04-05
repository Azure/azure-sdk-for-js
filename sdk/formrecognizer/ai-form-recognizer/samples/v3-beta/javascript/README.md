# Azure Form Recognizer client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Form Recognizer in some common scenarios.

| **File Name**                                                     | **Description**                                                                                                                |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [recognizeCustomForm.js][recognizecustomform]                     | extract information from forms using a custom trained model                                                                    |
| [recognizeReceipt.js][recognizereceipt]                           | extract data from an image of a receipt                                                                                        |
| [recognizeBusinessCard.js][recognizebusinesscard]                 | extract data from an image of a business card                                                                                  |
| [recognizeIdDocument.js][recognizeiddocument]                     | extract data from an image of an identity document                                                                             |
| [recognizeInvoice.js][recognizeinvoice]                           | extract data from an image of an invoice                                                                                       |
| [recognizeContent.js][recognizecontent]                           | extract layout information such as text lines and table structures from a document                                             |
| [recognizeReceiptFromUrl.js][recognizereceiptfromurl]             | extract data from a receipt by providing a URL to a file rather than a file stream directly                                    |
| [trainLabeledModel.js][trainlabeledmodel]                         | train a custom model with labeled inputs                                                                                       |
| [trainUnlabeledModel.js][trainunlabeledmodel]                     | train a custom model with unlabeled inputs (form documents only)                                                               |
| [differentiateLabeledUnlabeled.js][differentiatelabeledunlabeled] | see the differences in custom model recognition using labeled and unlabeled training documents                                 |
| [getBoundingBoxes.js][getboundingboxes]                           | display information about the outlines of form content and fields in a document                                                |
| [copyModel.js][copymodel]                                         | copy a custom model from one Form Recognizer resource to another                                                               |
| [createComposedModel.js][createcomposedmodel]                     | create a composed model from several individual labeled models                                                                 |
| [authenticationMethods.js][authenticationmethods]                 | authenticate a service client using both Azure Active Directory and an API key                                                 |
| [customModelManagement.js][custommodelmanagement]                 | display information about your account and its models                                                                          |
| [iteratorModels.js][iteratormodels]                               | list custom models using several different methods of iteration                                                                |
| [stronglyTypingRecognizedForm.js][stronglytypingrecognizedform]   | create a strongly-typed interface for a model with a known structure and use it to refine the output type of model recognition |
| [deleteAllModels.js][deleteallmodels]                             | delete all the models in a Form Recognizer account                                                                             |

## Prerequisites

The sample programs are compatible with Node.js >=12.0.0.

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
node recognizeCustomForm.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env FORM_RECOGNIZER_ENDPOINT="<form recognizer endpoint>" FORM_RECOGNIZER_API_KEY="<form recognizer api key>" CUSTOM_MODEL_ID="<custom model id>" node recognizeCustomForm.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[recognizecustomform]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/javascript/recognizeCustomForm.js
[recognizereceipt]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/javascript/recognizeReceipt.js
[recognizebusinesscard]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/javascript/recognizeBusinessCard.js
[recognizeiddocument]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/javascript/recognizeIdDocument.js
[recognizeinvoice]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/javascript/recognizeInvoice.js
[recognizecontent]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/javascript/recognizeContent.js
[recognizereceiptfromurl]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/javascript/recognizeReceiptFromUrl.js
[trainlabeledmodel]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/javascript/trainLabeledModel.js
[trainunlabeledmodel]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/javascript/trainUnlabeledModel.js
[differentiatelabeledunlabeled]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/javascript/differentiateLabeledUnlabeled.js
[getboundingboxes]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/javascript/getBoundingBoxes.js
[copymodel]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/javascript/copyModel.js
[createcomposedmodel]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/javascript/createComposedModel.js
[authenticationmethods]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/javascript/authenticationMethods.js
[custommodelmanagement]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/javascript/customModelManagement.js
[iteratormodels]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/javascript/iteratorModels.js
[stronglytypingrecognizedform]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/javascript/stronglyTypingRecognizedForm.js
[deleteallmodels]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/v3-beta/javascript/deleteAllModels.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/ai-form-recognizer
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecognitiveservicesaccount]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/README.md
