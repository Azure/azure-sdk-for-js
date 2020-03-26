# Azure Form Recognizer client library for JavaScript

[Form Recognizer](https://azure.microsoft.com/services/cognitive-services/form-recognizer/) is a cloud-based service that uses machine learning to extract text and table data from form documents. It allows you to train custom models using your own forms, to extract field names and values, and table data from them.  It also provides a prebuilt models you can use to extract values from receipts, or tables from any form.

[Source code](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/) |
[Package (NPM)](https://www.npmjs.com/package/@azure/ai-form-recognizer) |
[API reference documentation](https://aka.ms/azsdk-js-formrecognizer-ref-docs) |
[Product documentation](https://docs.microsoft.com/azure/cognitive-services/form-recognizer/) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples)

## Getting started

### Currently supported environments

- Node.js version 8.x.x or higher

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing [Cognitive Services][cognitive_resource] or Form Recognizer resource. If you need to create the resource, you can use the [Azure Portal][azure_portal] or [Azure CLI][azure_cli].

If you use the Azure CLI, replace `<your-resource-group-name>` and `<your-resource-name>` with your own unique names:

```PowerShell
az cognitiveservices account create --kind FormRecognizer --resource-group <your-resource-group-name> --name <your-resource-name>
```

### Install the `@azure/ai-form-recognizer` package

Install the Azure Form Recognizer client library for JavaScript with `npm`:

```bash
npm install @azure/ai-form-recognizer
```

### Create and authenticate a client

In order to interact with the Form Recognizer service, you'll need to select either a `ReceiptClient`, `FormLayoutClient`, or `CustomFormClient`, and create an instance of this type.  In the following samples, we will use `CustomFormClient` as an example.  To create a client instance to access the Form Recognizer API, you will need the `endpoint` of your Form Recognizer resource and a `credential`. The Form Recognizer client can use either Azure Active Directory credentials or an API key credential to authenticate.

You can find the endpoint for your form recognizer resource either in the [Azure Portal][azure_portal] or by using the [Azure CLI][azure_cli] snippet below:

```bash
az cognitiveservices account show --name <your-resource-name> --resource-group <your-resource-group-name> --query "endpoint"
```

#### Using an API Key

Use the [Azure Portal][azure_portal] to browse to your Form Recognizer resource and retrieve an API key, or use the [Azure CLI][azure_cli] snippet below:

**Note:** Sometimes the API key is referred to as a "subscription key" or "subscription API key."

```PowerShell
az cognitiveservices account keys list --resource-group <your-resource-group-name> --name <your-resource-name>
```

Once you have an API key and endpoint, you can use it as follows:

```js
const { CustomFormClient, ApiKeyCredential } = require("@azure/ai-form-recognizer");

const client = new CustomFormClient(
  "<endpoint>",
  new ApiKeyCredential("<API key>")
);
```

#### Using an Azure Active Directory Credential

Client API key authentication is used in most of the examples, but you can also authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below,
or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to [register a new AAD application][register_aad_app] and grant access to Form Recognizer by assigning the `"Cognitive Services User"` role to your service principal.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

```js
const { CustomFormClient } = require("@azure/ai-form-recognizer");
const { DefaultAzureCredential } = require("@azure/identity");

const client = new CustomFormClient("<endpoint>", new DefaultAzureCredential());
```

## Key concepts

### ReceiptClient
A `ReceiptClient` is the Form Recognizer interface to use for analyzing receipts.  It provides operations to extract receipt field values and locations from receipts from the United States.

### FormLayoutClient
A `FormLayoutClient` is the Form Recognizer interface to extract layout items from forms.  It provides operations to extract table data and geometry.

### CustomFormClient
A `CustomFormClient` is the Form Recognizer interface to use for creating, using, and managing custom machine-learned models. It provides operations for training models on forms you provide, and extracting field values and locations from your custom forms.  It also provides operations for viewing and deleting models, as well as understanding how close you are to reaching subscription limits for the number of models you can train.

### Long-Running Operations
Long-running operations are operations which consist of an initial request sent to the service to start an operation,followed by polling the service at intervals to determine whether the operation has completed or failed, and if it has succeeded, to get the result.

Methods that train models or extract values from forms are modeled as long-running operations.  The client exposes a `begin<operation-name>` method that returns an `Promise<PollerLike>`.  Callers should wait for the operation to complete by calling `pollUntilDone()` on the poller returned from the `begin<operation-name>` method.  A sample code snippet is provided to illustrate using long-running operations [below](#extracting-receipt-values-with-a-long-running-operation).

### Training models
Using the `CustomFormClient`, you can train a machine-learned model on your own form type.  The resulting model will be able to extract values from the types of forms it was trained on.

#### Training without labels
A model trained without labels uses unsupervised learning to understand the layout and relationships between field names and values in your forms. The learning algorithm clusters the training forms by type and learns what fields and tables are present in each form type. 

This approach doesn't require manual data labeling or intensive coding and maintenance, and we recommend you try this method first when training custom models.

#### Training with labels
A model trained with labels uses supervised learning to extract values you specify by adding labels to your training forms.  The learning algorithm uses a label file you provide to learn what fields are found at various locations in the form, and learns to extract just those values.

This approach can result in better-performing models, and those models can work with more complex form structures.

### Extracting values from forms
Using the `CustomFormClient`, you can use your own trained models to extract field values and locations, as well as table data, from forms of the type you trained your models on.  The output of models trained with and without labels differs as described below.

#### Using models trained without labels
Models trained without labels consider each form page to be a different form type.  For example, if you train your model on 3-page forms, it will learn that these are three different types of forms.  When you send a form to it for analysis, it will return a collection of three pages, where each page contains the field names, values, and locations, as well as table data, found on that page.

#### Using models trained with labels
Models trained with labels consider a form as a single unit.  For example, if you train your model on 3-page forms with labels, it will learn to extract field values from the locations you've labeled across all pages in the form.  If you sent a document containing two forms to it for analysis, it would return a collection of two forms, where each form contains the field names, values, and locations, as well as table data, found in that form.  Fields and tables have page numbers to identify the pages where they were found.

### Managing Custom Models
Using the `CustomFormClient`, you can get, list, and delete the custom models you've trained.  You can also view the count of models you've trained and the maximum number of models your subscription will allow you to store.


## Examples
The following section provides several code snippets illustrating common patterns used in the Form Recognizer API.

### Extracting receipt values with a long-running operation

```javascript
const { ReceiptRecognizerClient, CognitiveKeyCredential } = require("@azure/ai-form-recognizer");
const fs = require("fs");

require("dotenv").config();

async function main() {
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";
  const path = "./contoso-allinone.jpg";
  const readStream = fs.createReadStream(path);

  const client = new ReceiptRecognizerClient(endpoint, new CognitiveKeyCredential(apiKey));
  const poller = await client.extractReceipts(readStream, "image/jpeg", {
    onProgress: (state) => { console.log(`status: ${state.status}`); }
  });

  await poller.pollUntilDone();
  const response = poller.getResult();

  if (response) {
    console.log(response.receipts[0]);
  }
```

###


```javascript
```

###


```javascript
```

## Troubleshooting

### Enable logs

You can set the following environment variable to see debug logs when using this library.

- Getting debug logs from the Azure Form Recognizer client library

```bash
export DEBUG=azure*
```

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
[cognitive_resource]: https://docs.microsoft.com/en-us/azure/cognitive-services/cognitive-services-apis-create-account
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity
[cognitive_auth]: https://docs.microsoft.com/azure/cognitive-services/authentication
[register_aad_app]: https://docs.microsoft.com/azure/cognitive-services/authentication#assign-a-role-to-a-service-principal
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity#defaultazurecredential
