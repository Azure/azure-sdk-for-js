# Azure Form Recognizer client library for JavaScript

Azure Cognitive Services [Form Recognizer](https://azure.microsoft.com/services/cognitive-services/form-recognizer/) is a cloud service that uses machine learning to recognize text and table data
from form documents. It includes the following main functionalities:

* Custom models - Recognize field values and table data from forms. These models are trained with your own data, so they're tailored to your forms. You can then take these custom models and recognize forms. You can also manage the custom models you've created and see how close you are to the limit of custom models your account can hold.
* Content API - Recognize text and table structures, along with their bounding box coordinates, from documents. Corresponds to the REST service's Layout API.
* Prebuilt receipt model - Recognize data from USA sales receipts using a prebuilt model.

[Source code](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/) |
[Package (NPM)](https://www.npmjs.com/package/@azure/ai-form-recognizer) |
[API reference documentation](https://aka.ms/azsdk-js-formrecognizer-ref-docs) |
[Product documentation](https://docs.microsoft.com/azure/cognitive-services/form-recognizer/) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples)

## Getting started


### Prerequisites

- [Node.js](https://nodejs.org/) version 8.x.x or higher
- An [Azure subscription][azure_sub].
- A [Cognitive Services or Form Recognizer resource][FR_or_CS_resource] If you need to create the resource, you can use the [Azure Portal][azure_portal] or [Azure CLI][azure_cli].

### Create a Form Recognizer resource
Form Recognizer supports both [multi-service and single-service access][multi_and_single_service].
Create a Cognitive Services resource if you plan to access multiple cognitive services under a single endpoint/key. For Form Recognizer access only, create a Form Recognizer resource.

You can create the resource using

**Option 1:** [Azure Portal][azure_portal_create_FR_resource]

**Option 2:** [Azure CLI][azure_cli_create_FR_resource].
Below is an example of how you can create a Form Recognizer resource using the CLI:

```bash
# Create a new resource group to hold the form recognizer resource -
# if using an existing resource group, skip this step
az group create --name my-resource-group --location westus2
```

If you use the Azure CLI, replace `<your-resource-group-name>` and `<your-resource-name>` with your own unique names:

```bash
az cognitiveservices account create --kind FormRecognizer --resource-group <your-resource-group-name> --name <your-resource-name>
```

### Install the `@azure/ai-form-recognizer` package

Install the Azure Form Recognizer client library for JavaScript with `npm`:

```bash
npm install @azure/ai-form-recognizer
```

### Create and authenticate a client

In order to interact with the Form Recognizer service, you'll need to select either a `FormRecognizerClient` or a `FormTrainingClient`, and create an instance of this type.  In the following samples, we will use `FormRecognizerClient` as an example.  To create a client instance to access the Form Recognizer API, you will need the `endpoint` of your Form Recognizer resource and a `credential`. The Form Recognizer client use an API key credential to authenticate.

You can find the endpoint for your form recognizer resource either in the [Azure Portal][azure_portal] or by using the [Azure CLI][azure_cli] snippet below:

```bash
az cognitiveservices account show --name <your-resource-name> --resource-group <your-resource-group-name> --query "endpoint"
```

#### Using an API Key

Use the [Azure Portal][azure_portal] to browse to your Form Recognizer resource and retrieve an API key, or use the [Azure CLI][azure_cli] snippet below:

**Note:** Sometimes the API key is referred to as a "subscription key" or "subscription API key."

```bash
az cognitiveservices account keys list --resource-group <your-resource-group-name> --name <your-resource-name>
```

Once you have an API key and endpoint, you can use it as follows:

```js
const { FormRecognizerClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

const client = new FormRecognizerClient("<endpoint>", new AzureKeyCredential("<API key>"));
```

## Key concepts


### FormRecognizerClient
`FormRecognizerClient` provides operations for:

 - Recognizing form fields and content using custom models trained to recognize your custom forms. These values are returned in a collection of `RecognizedForm` objects.
 - Recognizing form content, including tables, lines and words, without the need to train a model. Form content is returned in a collection of `FormPage` objects.
 - Recognizing common fields from US receipts, using a pre-trained receipt model on the Form Recognizer service. These fields and meta-data are returned in a collection of `ReceiptWithLocale` objects with `US` locale.

### FormTrainingClient
`FormTrainingClient` provides operations for:

- Training custom models to recognize all fields and values found in your custom forms. A `CustomFormModel` is returned indicating the form types the model will recognize, and the fields it will extract for each form type. See the [service's documents][fr-train-without-labels] for a more detailed explanation.
- Training custom models to recognize specific fields and values you specify by labeling your custom forms. A `CustomFormModel` is returned indicating the fields the model will extract, as well as the estimated accuracy for each field. See the [service's documents][fr-train-with-labels] for a more detailed explanation.
- Managing models created in your account.

Please note that models can also be trained using a graphical user interface such as the [Form Recognizer Labeling Tool][fr-labeling-tool].

### Long-Running Operations
Long-running operations are operations which consist of an initial request sent to the service to start an operation,followed by polling the service at intervals to determine whether the operation has completed or failed, and if it has succeeded, to get the result.

Methods that train models or extract values from forms are modeled as long-running operations.  The client exposes a `begin<operation-name>` method that returns an `Promise<PollerLike>`.  Callers should wait for the operation to complete by calling `pollUntilDone()` on the poller returned from the `begin<operation-name>` method.  Sample code snippets are provided
to illustrate using long-running operations [below](#Examples).

## Examples
The following section provides several JavaScript code snippets illustrating common patterns used in the Form Recognizer client libraries.

### Recognize receipts

Recognize data from USA sales receipts using the pre-built model.

```javascript
const { FormRecognizerClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");
const fs = require("fs");

async function main() {
  const endpoint = "<cognitive services endpoint>";
  const apiKey = "<api key>";
  const path = "<path to your receipt document>"; // pdf/jpeg/png/tiff formats

  const readStream = fs.createReadStream(path);

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeReceipts(readStream, "image/jpeg", {
    onProgress: (state) => { console.log(`status: ${state.status}`); }
  });

  await poller.pollUntilDone();
  const response = poller.getResult();

  console.log(`### Response status ${response.status}`);
  const usReceipt = response.receipts[0];
  console.log("First receipt:")
  console.log(`Receipt type: ${usReceipt.receiptType}`)
  console.log(`Merchant Name: ${usReceipt.merchantName.value} (confidence: ${usReceipt.merchantName.confidence})`);
  console.log(`Transaction Date: ${usReceipt.transactionDate.value} (confidence: ${usReceipt.transactionDate.confidence})`);
  console.log("Receipt items:");
  console.log(`  name\tprice\tquantity\ttotalPrice`);
  for (const item of usReceipt.items) {
    const name = `${optionalToString(item.name?.value)} (confidence: ${optionalToString(item.name?.confidence)})`;
    const price = `${optionalToString(item.price?.value)} (confidence: ${optionalToString(item.price?.confidence)})`;
    const quantity = `${optionalToString(item.quantity?.value)} (confidence: ${optionalToString(item.quantity?.confidence)})`;
    const totalPrice = `${optionalToString(item.totalPrice?.value)} (confidence: ${optionalToString(item.totalPrice?.confidence)})`;
    console.log(`  ${name}\t${price}\t${quantity}\t${totalPrice}`);
  }

  // raw fields are also included in the result
  console.log("Raw 'MerchantAddress' field:");
  console.log(usReceipt.recognizedForm.fields["MerchantAddress"]);
}

function optionalToString(value) {
  return `${value || "<missing>"}`;
}

main();
```

### Recognize content

Recognize text and table structures, along with their bounding box, from documents

```javascript
const { FormRecognizerClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");
const fs = require("fs");

async function main() {
  const endpoint = "<cognitive services endpoint>";
  const apiKey = || "<api key>";
  const path = "<path to your receipt document>"; // pdf/jpeg/png/tiff formats

  const readStream = fs.createReadStream(path);

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeContent(readStream);
  await poller.pollUntilDone();
  const response = poller.getResult();

  if (!response) {
    throw new Error("Expecting valid response!");
  }

  console.log(response.status);
  for (const page of response.pages) {
    console.log(
      `Page ${page.pageNumber}: width ${page.width} and height ${page.height} with unit ${page.unit}`
    );
    for (const table of page.tables) {
      for (const row of table.rows) {
        for (const cell of row.cells) {
          console.log(`cell [${cell.rowIndex},${cell.columnIndex}] has text ${cell.text}`);
        }
      }
    }
  }
}

main();
```

### Train model

Train a machine-learned model on your own form type. The resulting model will be able to recognize values from the types of forms it was trained on. Provide a container SAS url to your Azure Storage Blob container where you're storing the training documents. See details on setting this up in the [service quickstart documentation][quickstart_training]. This sample creates and trains a custom model without using labels.

```javascript
const { FormRecognizerClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

async function main() {
  const endpoint = "<cognitive services endpoint>";
  const apiKey = "<api key>";
  const containerSasUrl = "<SAS url to the blob container storing training documents>";

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const trainingClient = client.getFormTrainingClient();

  const poller = await trainingClient.beginTraining(containerSasUrl, false, {
    onProgress: (state) => { console.log(`training status: ${state.status}`); }
  });

  await poller.pollUntilDone();
  const response = poller.getResult();
  console.log(`Model ID: ${response.modelId}`);
  console.log(`Status: ${response.status}`);
  console.log(`Created on: ${response.createdOn}`);
  console.log(`Last modified: ${response.lastModified}`);

  if (response.models) {
    for (const submodel of response.models) {
      console.log("We have recognized the following fields");
      for (const key in submodel.fields) {
        const field = submodel.fields[key];
        console.log(`The model found field '${field.name}'`)
      }
    }
  }
  if (response.trainingDocuments) {
    for (const doc of response.trainingDocuments) {
      console.log(`Document name: ${doc.documentName}`);
      console.log(`Document status: ${doc.status}`);
      console.log(`Document page count: ${doc.pageCount}`);
      console.log(`Document errors: ${doc.errors}`);
    }
  }
}

main();
```

### Recognize forms using a custom model

```javascript
const { FormRecognizerClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

async function main() {
  const endpoint = "<cognitive services endpoint>";
  const apiKey = "<api key>";
  const modelId = "<model id>";
  const path = "<path to a form document>";

  const readStream = fs.createReadStream(path);

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeForms(modelId, readStream, "application/pdf", {
    onProgress: (state) => { console.log(`status: ${state.status}`); }
  });
  await poller.pollUntilDone();
  const response = poller.getResult();

  console.log(response.status);
  console.log("Forms:")
  for (const form of response.forms || []) {
    console.log(`${form.formType}, page range: ${form.pageRange}`);
    console.log("Pages:")
    for (const page of form.pages || []) {
      console.log(`Page number: ${page.pageNumber}`);
      console.log("Tables");
      for (const table of page.tables || []) {
        for (const row of table.rows) {
          for (const cell of row.cells) {
            console.log(`cell (${cell.rowIndex},${cell.columnIndex}) ${cell.text}`);
          }
        }
      }
    }

    console.log("Fields:");
    for (const fieldName in form.fields) {
      // each field is of type FormField
      const field = form.fields[fieldName];
      console.log(`Field ${fieldName} has value '${field.value}' with a confidence score of ${field.confidence}`)
    }
  }
}

main()
```

### Listing all models

Listing custom models in the current cognitive service account. This sample shows several ways to iterate through the result.

```javascript
const { FormRecognizerClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

async function main() {
  const endpoint = "<cognitive services endpoint>";
  const apiKey = "<api key>";
  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const trainingClient = client.getFormTrainingClient();

  // returns an async iteratable iterator that supports paging
  const result = await trainingClient.listModels();
  let i = 0;
  for await (const modelInfo of result) {
    console.log(`model ${i++}:`);
    console.log(modelInfo);
  }

  // using `iter.next()`
  i = 1;
  let iter = trainingClient.listModels();
  let modelItem = await iter.next();
  while (!modelItem.done) {
    console.log(`model ${i++}: ${modelItem.value.modelId}`);
    modelItem = await iter.next();
  }

  // using `byPage()`
  i = 1;
  for await (const response of trainingClient.listModels().byPage()) {
    for (const modelInfo of response.modelList) {
      console.log(`model ${i++}: ${modelInfo.modelId}`);
    }
  }
}

main();
```

## Troubleshooting

### Enable logs

You can set the following environment variable to see debug logs when using this library.

- Getting debug logs from the Azure Form Recognizer client library

```bash
export DEBUG=azure*
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/logger).

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples)
directory for detailed examples on how to use this library.

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fformrecognizer%2Fai-form-recognizer%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[FR_or_CS_resource]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account?tabs=multiservice%2Cwindows
[azure_portal]: https://portal.azure.com
[quickstart_training]: https://docs.microsoft.com/azure/cognitive-services/form-recognizer/quickstarts/curl-train-extract#train-a-form-recognizer-model
[multi_and_single_service]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account?tabs=multiservice%2Cwindows
[azure_portal_create_FR_resource]: https://ms.portal.azure.com/#create/Microsoft.CognitiveServicesFormRecognizer
[azure_cli_create_FR_resource]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account-cli?tabs=windows
[fr-labeling-tool]: https://docs.microsoft.com/en-us/azure/cognitive-services/form-recognizer/quickstarts/label-tool
[fr-train-without-labels]: https://docs.microsoft.com/en-us/azure/cognitive-services/form-recognizer/overview#train-without-labels
[fr-train-with-labels]: https://docs.microsoft.com/en-us/azure/cognitive-services/form-recognizer/overview#train-with-labels
