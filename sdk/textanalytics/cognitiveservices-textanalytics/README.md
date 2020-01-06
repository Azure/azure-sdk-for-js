# Azure TextAnalytics client library for JavaScript

[Azure TextAnalytics](https://azure.microsoft.com/en-us/services/cognitive-services/text-analytics/) is a cloud-based service that provides advanced natural language processing over raw text, and includes six main functions:

- Language Detection
- Sentiment Analysis
- Key Phrase Extraction
- Named Entity Recognition
- Recognition of Personally Identifiable Information
- Linked Entity Recognition

Use the client library to:

- Detect what language input text is written in.
- Determine what customers think of your brand or topic by analyzing raw text for clues about positive or negative sentiment.
- Automatically extract key phrases to quickly identify the main points.
- Identify and categorize entities in your text as people, places, organizations, date/time, quantities, percentages, currencies, and more.

[Source code](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/textanalytics/cognitiveservices-textanalytics/) |
[Package (NPM)](https://www.npmjs.com/package/@azure/cognitiveservices-textanalytics) |
[API reference documentation](https://docs.microsoft.com/javascript/api/@azure/cognitiveservices-textanalytics) |
[Product documentation](https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/textanalytics/cognitiveservices-textanalytics/samples)

## Getting started

### Currently supported environments

- Node.js version 8.x.x or higher

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing [Cognitive Services][cognitive_resource] or Text Analytics resource. If you need to create the resource, you can use the [Azure Portal][azure_portal] or [Azure CLI][azure_cli].

If you use the Azure CLI, replace `<your-resource-group-name>` and `<your-resource-name>` with your own unique names:

```PowerShell
az cognitiveservices account create --kind TextAnalytics --resource-group <your-resource-group-name> --name <your-resource-name>
```

### 1. Install the `@azure/cognitiveservices-textanalytics` package

```bash
npm install @azure/cognitiveservices-textanalytics
```

### 2. Create and authenticate a `TextAnalyticsClient`

TextAnalytics uses both AAD and service keys for authentication.

#### Using a Subscription Key

Use the [Azure CLI][azure_cli] snippet below to get the subscription key from the Text Analytics resource.

```PowerShell
az cognitiveservices account keys list --resource-group <your-resource-group-name> --name <your-resource-name>
```

Alternatively, you can get the endpoint and subscription key from the resource information in the [Azure Portal][azure_portal].

Once you have a service key, you can use it as follows:

```js
const {
  TextAnalyticsClient,
  CognitiveServicesCredential
} = require("@azure/cognitiveservices-textanalytics");

const client = new TextAnalyticsClient(
  "<endpoint>",
  new CognitiveServicesCredential("<service key>")
);
```

#### Using an Azure Active Directory Credential

Client subscription key authentication is used in most of the examples, but you can also authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below,
or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install --save @azure/identity
```

You will also need to [register a new AAD application][register_aad_app] and grant access to Text Analytics by assigning the `"Cognitive Services User"` role to your service principal.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET.

```js
const { TextAnalyticsClient } = require("@azure/cognitiveservices-textanalytics");
const { DefaultAzureCredential } = require("@azure/identity");

const client = new TextAnalyticsClient("<endpoint>", new DefaultAzureCredential());
```

## Key concepts

### TextAnalyticsClient

`TextAnalyticsClient` is the primary interface for developers using the Text Analytics client library. It provides asynchronous methods to access a specific use of Text Analytics, such as language detection or key phrase extraction.

### Text Input

A **text input**, sometimes called a **document**, is a single unit of input to be analyzed by the predictive models in the Text Analytics service. Operations on `TextAnalyticsClient` take a collection of inputs to be analyzed as a batch.

### Operation Result

An operation result, such as `AnalyzeSentimentResult`, is the result of a Text Analytics operation, containing a prediction or predictions about a single text input. An operation's result type also may optionally include information about the input document and how it was processed.

### Operation Result Collection

An operation result collection, such as `AnalyzeSentimentResultCollection`, is a collection of operation results, where each corresponds to one of the text inputs provided in the input batch. A text input and its result will have the same index the input and result collections. An operation result collection may optionally include information about the input batch and how it was processed.

### Operation Overloads

For each supported operation, `TextAnalyticsClient` provides method overloads to take a batch of text inputs as strings or a batch of `LanguageInput` or `MultiLanguageInput` objects, depending on the operation. Overloads that take an object batches allows callers to give each document a unique ID, or indicate extra metadata such as the langauge the document is written in or the country of origin.

## Examples

### Detect the language of an input string

```js
const [result] = await client.detectLanguage(["hello world"]);
console.log(`Primary language detected as ${result.primaryLanguage.name}`);
```

## Troubleshooting

### Enable logs

You can set the following environment variable to get the debug logs when using this library.

- Getting debug logs from the Key Vault Secrets SDK

```bash
export DEBUG=azure*
```

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/textanalytics/cognitiveservices-textanalytics/samples)
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Ftextanalytics%2Fcognitiveservices-textanalytics%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[cognitive_resource]: https://docs.microsoft.com/en-us/azure/cognitive-services/cognitive-services-apis-create-account
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity
[cognitive_auth]: https://docs.microsoft.com/en-us/azure/cognitive-services/authentication
[register_aad_app]: https://docs.microsoft.com/azure/cognitive-services/authentication#assign-a-role-to-a-service-principal
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity#defaultazurecredential
