# Azure Form Recognizer client library for JavaScript

Azure Cognitive Services [Form Recognizer](https://azure.microsoft.com/services/cognitive-services/form-recognizer/) uses cloud-based machine learning to extract structured data from form documents. Its features include:

- Custom Form Models: Create machine learning models to recognize structured data such as field values and tables from forms. The models are trained on your own data, so they're tailored to your forms' structure. Then, use the custom models to extract recognized fields and content from forms. Use the API to manage your models by creating, listing, deleting, and copying models;
- Content API: Extract raw page elements&mdash;such as text words/lines, tables, and selection marks&mdash;and their bounding box coordinates from documents (this corresponds to the REST service's "layout" API).
- Prebuilt Models: Extract data from certain types of common documents (such as receipts, invoices, and business cards) using models developed by the Azure Form Recognizer team.

**Note:** This package targets Azure Form Recognizer service API version 2.x.

[Source code](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/) |
[Package (NPM)](https://www.npmjs.com/package/@azure/ai-form-recognizer) |
[API reference documentation](https://aka.ms/azsdk/js/formrecognizer/docs) |
[Product documentation](https://docs.microsoft.com/azure/cognitive-services/form-recognizer/) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples)

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) version 8.x.x or higher
- An [Azure subscription][azure_sub].
- A [Cognitive Services or Form Recognizer resource][fr_or_cs_resource]. If you need to create the resource, you can use the [Azure Portal][azure_portal] or [Azure CLI][azure_cli].

#### Create a Form Recognizer resource

Form Recognizer supports both [multi-service and single-service access][multi_and_single_service]. Create a Cognitive Services resource if you plan to access multiple cognitive services under a single endpoint/key. For Form Recognizer access only, create a Form Recognizer resource.

You can create the resource using

**Option 1:** [Azure Portal][azure_portal_create_fr_resource]

**Option 2:** [Azure CLI][azure_cli_create_fr_resource].

Below is an example of how you can create a Form Recognizer resource using the CLI:

```bash
# Create a new resource group to hold the Form Recognizer resource -
# if using an existing resource group, skip this step
az group create --name my-resource-group --location westus2
```

If you use the Azure CLI, replace `<your-resource-group-name>` and `<your-resource-name>` with your own unique names:

```bash
az cognitiveservices account create --kind FormRecognizer --resource-group <your-resource-group-name> --name <your-resource-name> --sku <your-sku-name> --location <your-location>
```

### Install the `@azure/ai-form-recognizer` package

Install the Azure Form Recognizer client library for JavaScript with `npm`:

```bash
npm install @azure/ai-form-recognizer
```

### Create and authenticate a client

In order to interact with the Form Recognizer service, you'll need to select either a `FormRecognizerClient` or a `FormTrainingClient`, and create an instance of this type. In the following examples, we will use `FormRecognizerClient`. To create a client instance to access the Form Recognizer API, you will need the `endpoint` of your Form Recognizer resource and a `credential`. The Form Recognizer clients can use either an `AzureKeyCredential` with an API key of your resource or a `TokenCredential` that uses Azure Active Directory RBAC to authorize the client.

You can find the endpoint for your Form Recognizer resource either in the [Azure Portal][azure_portal] or by using the [Azure CLI][azure_cli] snippet below:

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

#### Using Azure Active Directory

API key authorization is used in most of the examples, but you can also authenticate the client with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

To authenticate using a service principal, you will also need to [register an AAD application][register_aad_app] and grant access to Form Recognizer by assigning the `"Cognitive Services User"` role to your service principal (note: other roles such as `"Owner"` will not grant the necessary permissions, only `"Cognitive Services User"` will suffice to run the examples and the sample code).

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

```js
const { FormRecognizerClient } = require("@azure/ai-form-recognizer");
const { DefaultAzureCredential } = require("@azure/identity");

const client = new FormRecognizerClient("<endpoint>", new DefaultAzureCredential());
```

## Key concepts

### FormRecognizerClient

`FormRecognizerClient` provides operations for:

- Recognizing form fields and content using custom models trained on your custom forms' structure. These values are returned in an array of `RecognizedForm` objects.
- Recognizing fields from prebuilt models of common types of documents, including reciepts, invoices, and business cards. These values are also returned in an array of `RecognizedForm` objects.
- Extracting form content, including tables, lines/words, and selection marks without the need to train a model. Form content is returned in an array of `FormPage` objects.

### FormTrainingClient

`FormTrainingClient` provides operations for:

- Training custom models to recognize fields and values found in your custom forms without providing any label data. Model training operations return a `CustomFormModel` indicating the form types the model will recognize and the fields it will extract for each form type. See the [service's documentation on unlabeled model training][fr-train-without-labels] for a more detailed explanation of creating a training data set.
- Training custom models to recognize specific fields and values you specify by labeling your custom forms. Similarly, labeled model training returns a `CustomFormModel` indicating the fields the model will extract, as well as the model's confidence in the accuracy of each field. See the [service's documentation on labeled model training][fr-train-with-labels] for a more detailed explanation of applying labels to a training data set.
- Managing models created in your account by creating, listing, and deleting models.
- Copying a custom model from one Form Recognizer resource to another (or even to the same Form Recognizer resource).
- Composing multiple custom models trained with labels into a single model. When used for custom form recognition, the new composed model will first perform a classification of the input documents to determine which of its submodels is most appropriate.

Please note that models can also be trained using a graphical user interface such as the [Form Recognizer Labeling Tool][fr-labeling-tool].

Sample code snippets that illustrate the use of `FormTrainingClient` can be found [below, in the "Train a Model" section.](#train-a-model).

### Long-Running Operations

Long-running operations (LROs) are operations which consist of an initial request sent to the service to start an operation, followed by polling for a result at a certain intervals to determine if the operation has completed and whether it failed or succeeded. Ultimately, the LRO will either fail with an error or produce a result.

In Azure Form Recognizer, operations that create/copy models (including composing models) or that extract values from forms are LROs. The SDK clients provide asynchronous `begin<operation-name>` methods that return `Promise<PollerLike>` objects. The `PollerLike` object represents the LRO, and a program can wait for the operation to complete by awaiting `pollUntilDone()` on the poller returned from the `begin<operation-name>` method. Sample code snippets are provided to illustrate using long-running operations in the next section.

## Examples

The following section provides several JavaScript code snippets illustrating common patterns used in the Form Recognizer client libraries.

- [Recognize Forms Using a Custom Model](#recognize-forms-using-a-custom-model)
- [Recognize Content](#recognize-content)
- [Use Prebuilt Models](#using-prebuilt-models)
- [Train a Model](#train-a-model)
- [Listing All Models](#listing-all-models)

### Recognize Forms Using a Custom Model

Recognize fields and table data from forms. These models are trained with your own data, so they're tailored to your forms. A custom model should only be used with forms of the same document structure as those used to train the model.

```javascript
const { FormRecognizerClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

const fs = require("fs");

async function main() {
  const endpoint = "<cognitive services endpoint>";
  const apiKey = "<api key>";
  const modelId = "<model id>";
  const path = "<path to a form document>";

  const readStream = fs.createReadStream(path);

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeCustomForms(modelId, readStream, {
    onProgress: (state) => {
      console.log(`status: ${state.status}`);
    }
  });
  const forms = await poller.pollUntilDone();

  console.log("Forms:");
  for (const form of forms || []) {
    console.log(`${form.formType}, page range: ${form.pageRange}`);
    console.log("Pages:");
    for (const page of form.pages || []) {
      console.log(`Page number: ${page.pageNumber}`);
      console.log("Tables");
      for (const table of page.tables || []) {
        for (const cell of table.cells) {
          console.log(`cell (${cell.rowIndex},${cell.columnIndex}) ${cell.text}`);
        }
      }
    }

    console.log("Fields:");
    for (const fieldName in form.fields) {
      // each field is of type FormField
      const field = form.fields[fieldName];
      console.log(
        `Field ${fieldName} has value '${field.value}' with a confidence score of ${field.confidence}`
      );
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

Alternatively, a form URL can be used to recognize custom forms using the `beginRecognizeCustomFormsFromUrl` method. URL sources must be accessible from the service (in other words, a private intranet URL, or URLs that use header- or certificate-based secrets, will not work, as the Form Recognizer service must be able to access the URL). Methods with a `FromUrl` suffix that use URLs instead of file streams exist for all of the recognition methods.

### Recognize Content

Recognize text words/lines, tables, and selection marks along with their bounding boxes in documents:

```javascript
const { FormRecognizerClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

const fs = require("fs");

async function main() {
  const endpoint = "<cognitive services endpoint>";
  const apiKey = "<api key>";
  const path = "<path to your receipt document>"; // pdf/jpeg/png/tiff formats

  const readStream = fs.createReadStream(path);

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeContent(readStream);
  const pages = await poller.pollUntilDone();

  if (!pages || pages.length === 0) {
    throw new Error("Expecting non-empty list of pages!");
  }

  for (const page of pages) {
    console.log(
      `Page ${page.pageNumber}: width ${page.width} and height ${page.height} with unit ${page.unit}`
    );
    for (const table of page.tables) {
      for (const cell of table.cells) {
        console.log(`cell [${cell.rowIndex},${cell.columnIndex}] has text ${cell.text}`);
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

### Using Prebuilt Models

Extract fields from certain types of common forms such as receipts, invoices, and business cards using prebuilt models provided by the Form Recognizer service.

For example, to extract fields from a sales receipt, use the prebuilt receipt model provided by the `beginRecognizeReceipts` method:

```javascript
const { FormRecognizerClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

const fs = require("fs");

async function main() {
  const endpoint = "<cognitive services endpoint>";
  const apiKey = "<api key>";
  const path = "<path to your receipt document>"; // pdf/jpeg/png/tiff formats

  const readStream = fs.createReadStream(path);

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeReceipts(readStream, {
    onProgress: (state) => {
      console.log(`status: ${state.status}`);
    }
  });

  const receipts = await poller.pollUntilDone();

  if (!receipts || receipts.length <= 0) {
    throw new Error("Expecting at lease one receipt in analysis result");
  }

  const receipt = receipts[0];
  console.log("First receipt:");
  const receiptTypeField = receipt.fields["ReceiptType"];
  if (receiptTypeField.valueType === "string") {
    console.log(
      `  Receipt Type: '${receiptTypeField.value || "<missing>"}', with confidence of ${
        receiptTypeField.confidence
      }`
    );
  }
  const merchantNameField = receipt.fields["MerchantName"];
  if (merchantNameField.valueType === "string") {
    console.log(
      `  Merchant Name: '${merchantNameField.value || "<missing>"}', with confidence of ${
        merchantNameField.confidence
      }`
    );
  }
  const transactionDate = receipt.fields["TransactionDate"];
  if (transactionDate.valueType === "date") {
    console.log(
      `  Transaction Date: '${transactionDate.value || "<missing>"}', with confidence of ${
        transactionDate.confidence
      }`
    );
  }
  const itemsField = receipt.fields["Items"];
  if (itemsField.valueType === "array") {
    for (const itemField of itemsField.value || []) {
      if (itemField.valueType === "object") {
        const itemNameField = itemField.value["Name"];
        if (itemNameField.valueType === "string") {
          console.log(
            `    Item Name: '${itemNameField.value || "<missing>"}', with confidence of ${
              itemNameField.confidence
            }`
          );
        }
      }
    }
  }
  const totalField = receipt.fields["Total"];
  if (totalField.valueType === "number") {
    console.log(
      `  Total: '${totalField.value || "<missing>"}', with confidence of ${totalField.confidence}`
    );
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

You are not limited to receipts! There are a few prebuilt models to choose from, each of which has its own set of supported fields.:

- Receipts, through the `beginRecognizeReceipts` method (see [the supported fields of the receipt model](https://aka.ms/azsdk/formrecognizer/receiptfields)).
- Business cards, through `beginRecognizeBusinessCards` (see [the supported fields of the business card model](https://aka.ms/azsdk/formrecognizer/businesscardfields)).
- Invoices, through `beginRecognizeInvoices` (see [the supported fields of the invoice model](https://aka.ms/azsdk/formrecognizer/invoicefields)).

### Train a Model

Train a machine learning model on your own form data. The resulting model will be able to recognize values from the structures of forms it was trained on. The training operation accepts a SAS-encoded URL to an Azure Storage Blob container that holds the training documents. The training operation will read the files in the container and create a model based on their contents. For more details on how to create and structure a training container, see the [service quickstart documentation][quickstart_training].

For example, the following program trains a custom model without using labels:

```javascript
const { FormTrainingClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

async function main() {
  const endpoint = "<cognitive services endpoint>";
  const apiKey = "<api key>";
  const containerSasUrl = "<SAS url to the blob container storing training documents>";

  const trainingClient = new FormTrainingClient(endpoint, new AzureKeyCredential(apiKey));

  const poller = await trainingClient.beginTraining(containerSasUrl, false, {
    onProgress: (state) => {
      console.log(`training status: ${state.status}`);
    }
  });
  const model = await poller.pollUntilDone();

  if (!model) {
    throw new Error("Expecting valid training result!");
  }

  console.log(`Model ID: ${model.modelId}`);
  console.log(`Status: ${model.status}`);
  console.log(`Training started on: ${model.trainingStartedOn}`);
  console.log(`Training completed on: ${model.trainingCompletedOn}`);

  if (model.submodels) {
    for (const submodel of model.submodels) {
      // since the training data is unlabeled, we are unable to return the accuracy of this model
      console.log("We have recognized the following fields");
      for (const key in submodel.fields) {
        const field = submodel.fields[key];
        console.log(`The model found field '${field.name}'`);
      }
    }
  }
  // Training document information
  if (model.trainingDocuments) {
    for (const doc of model.trainingDocuments) {
      console.log(`Document name: ${doc.name}`);
      console.log(`Document status: ${doc.status}`);
      console.log(`Document page count: ${doc.pageCount}`);
      console.log(`Document errors: ${doc.errors}`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

For information on creating a _labeled_ training data set, see [the documentation of the sample labeling tool][quickstart_labeling] and [the labeled model training sample][labeled_sample].

### Listing All Models

`FormTrainingClient` also provides some methods for managing the custom models. The following example shows several ways to iterate through the custom models in a Form Recognizer resource.

```javascript
const { FormTrainingClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

async function main() {
  const endpoint = "<cognitive services endpoint>";
  const apiKey = "<api key>";
  const client = new FormTrainingClient(endpoint, new AzureKeyCredential(apiKey));

  // returns an async iteratable iterator that supports paging
  const result = client.listCustomModels();
  let i = 0;
  for await (const modelInfo of result) {
    console.log(`model ${i++}:`);
    console.log(modelInfo);
  }

  // using `iter.next()`
  i = 1;
  let iter = client.listCustomModels();
  let modelItem = await iter.next();
  while (!modelItem.done) {
    console.log(`model ${i++}: ${modelItem.value.modelId}`);
    modelItem = await iter.next();
  }

  // using `byPage()`
  i = 1;
  for await (const response of client.listCustomModels().byPage()) {
    for (const modelInfo of response.modelList) {
      console.log(`model ${i++}: ${modelInfo.modelId}`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
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

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples) directory for detailed code samples that show how to use this library including several features and methods that are not shown in the "Examples" section above, such as copying and composing models.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fformrecognizer%2Fai-form-recognizer%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[fr_or_cs_resource]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account?tabs=multiservice%2Cwindows
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity
[register_aad_app]: https://docs.microsoft.com/azure/cognitive-services/authentication#assign-a-role-to-a-service-principal
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity#defaultazurecredential
[quickstart_training]: https://docs.microsoft.com/azure/cognitive-services/form-recognizer/quickstarts/curl-train-extract#train-a-form-recognizer-model
[quickstart_labeling]: https://docs.microsoft.com/azure/cognitive-services/form-recognizer/quickstarts/label-tool
[labeled_sample]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/samples/typescript/src/trainLabeledModel.ts
[multi_and_single_service]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account?tabs=multiservice%2Cwindows
[azure_portal_create_fr_resource]: https://ms.portal.azure.com/#create/Microsoft.CognitiveServicesFormRecognizer
[azure_cli_create_fr_resource]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account-cli?tabs=windows
[fr-labeling-tool]: https://docs.microsoft.com/azure/cognitive-services/form-recognizer/quickstarts/label-tool
[fr-train-without-labels]: https://docs.microsoft.com/azure/cognitive-services/form-recognizer/overview#train-without-labels
[fr-train-with-labels]: https://docs.microsoft.com/azure/cognitive-services/form-recognizer/overview#train-with-labels
