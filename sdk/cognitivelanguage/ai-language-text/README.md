# Azure Text Analysis client library for JavaScript

[Azure Cognitive Service for Language](https://azure.microsoft.com/services/cognitive-services/language-service/) is a cloud-based service that provides advanced natural language processing over raw text, and includes the following main features:

**Note:** This SDK targets Azure Cognitive Service for Language API version 2023-04-01.

- Language Detection
- Sentiment Analysis
- Key Phrase Extraction
- Named Entity Recognition
- Recognition of Personally Identifiable Information
- Entity Linking
- Healthcare Analysis
- Extractive Summarization
- Abstractive Summarization
- Custom Entity Recognition
- Custom Document Classification
- Support Multiple Actions Per Document

Use the client library to:

- Detect what language input text is written in.
- Determine what customers think of your brand or topic by analyzing raw text for clues about positive or negative sentiment.
- Automatically extract key phrases to quickly identify the main points.
- Identify and categorize entities in your text as people, places, organizations, date/time, quantities, percentages, currencies, healthcare specific, and more.
- Perform multiple of the above tasks at once.

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/)
- [Package (NPM)](https://www.npmjs.com/package/@azure/ai-language-text)
- [API reference documentation](https://aka.ms/ai-language-text-js-api)
- [Product documentation](https://docs.microsoft.com/azure/cognitive-services/language-service/)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-text/samples)

#### **_Migrating from @azure/ai-text-analytics advisory_ ⚠️**

Please see the [Migration Guide](https://github.com/azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/MIGRATION_ai_text_analytics.md) for detailed instructions on how to update application code from version 5.x of the AI Text Analytics client library to the new AI Language Text client library.

## What's New

* [Abstractive Summarization](https://github.com/azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/Samples.md#abstractive-summarization)
* [Healthcare Analysis](https://github.com/azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/Samples.md#healthcare-analysis)


## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing [Cognitive Services][cognitive_resource] or Language resource. If you need to create the resource, you can use the [Azure Portal][azure_portal] or [Azure CLI][azure_cli] following the steps in [this document][cli_docs].

If you use the Azure CLI, replace `<your-resource-group-name>` and `<your-resource-name>` with your own unique names:

```PowerShell
az cognitiveservices account create --kind TextAnalytics --resource-group <your-resource-group-name> --name <your-resource-name> --sku <your-sku-name> --location <your-location>
```

### Install the `@azure/ai-language-text` package

Install the Azure Text Analysis client library for JavaScript with `npm`:

```bash
npm install @azure/ai-language-text
```

### Create and authenticate a `TextAnalysisClient`

To create a client object to access the Language API, you will need the `endpoint` of your Language resource and a `credential`. The Text Analysis client can use either Azure Active Directory credentials or an API key credential to authenticate.

You can find the endpoint for your Language resource either in the [Azure Portal][azure_portal] or by using the [Azure CLI][azure_cli] snippet below:

```bash
az cognitiveservices account show --name <your-resource-name> --resource-group <your-resource-group-name> --query "properties.endpoint"
```

#### Using an API Key

Use the [Azure Portal][azure_portal] to browse to your Language resource and retrieve an API key, or use the [Azure CLI][azure_cli] snippet below:

**Note:** Sometimes the API key is referred to as a "subscription key" or "subscription API key."

```PowerShell
az cognitiveservices account keys list --resource-group <your-resource-group-name> --name <your-resource-name>
```

Once you have an API key and endpoint, you can use the `AzureKeyCredential` class to authenticate the client as follows:

```javascript
const { TextAnalysisClient, AzureKeyCredential } = require("@azure/ai-language-text");

const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));
```

#### Using an Azure Active Directory Credential

Client API key authentication is used in most of the examples, but you can also authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below,
or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to [register a new AAD application][register_aad_app] and grant access to Language by assigning the `"Cognitive Services User"` role to your service principal (note: other roles such as `"Owner"` will not grant the necessary permissions, only `"Cognitive Services User"` will suffice to run the examples and the sample code).

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

```javascript
const { TextAnalysisClient } = require("@azure/ai-language-text");
const { DefaultAzureCredential } = require("@azure/identity");

const client = new TextAnalysisClient("<endpoint>", new DefaultAzureCredential());
```

## Key concepts

### TextAnalysisClient

`TextAnalysisClient` is the primary interface for developers using the Text Analysis client library. Explore the methods on this client object to understand the different features of the Language service that you can access.

### Input

A **document** represents a single unit of input to be analyzed by the predictive models in the Language service. Operations on `TextAnalysisClient` take a collection of inputs to be analyzed as a batch. The operation methods have overloads that allow the inputs to be represented as strings, or as objects with attached metadata.

For example, each document can be passed as a string in an array, e.g.

```typescript
const documents = [
  "I hated the movie. It was so slow!",
  "The movie made it into my top ten favorites.",
  "What a great movie!",
];
```

or, if you wish to pass in a per-item document `id` or `language`/`countryHint`, they can be given as a list of `TextDocumentInput` or `DetectLanguageInput` depending on the operation;

```javascript
const textDocumentInputs = [
  { id: "1", language: "en", text: "I hated the movie. It was so slow!" },
  { id: "2", language: "en", text: "The movie made it into my top ten favorites." },
  { id: "3", language: "en", text: "What a great movie!" },
];
```

See [service limitations][data_limits] for the input, including document length limits, maximum batch size, and supported text encodings.

### Return Value

The return value corresponding to a single document is either a successful result or an error object. Each `TextAnalysisClient` method returns a heterogeneous array of results and errors that correspond to the inputs by index. A text input and its result will have the same index in the input and result collections.

An **result**, such as `SentimentAnalysisResult`, is the result of a Language operation, containing a prediction or predictions about a single text input. An operation's result type also may optionally include information about the input document and how it was processed.

The **error** object, `TextAnalysisErrorResult`, indicates that the service encountered an error while processing the document and contains information about the error.

### Document Error Handling

In the collection returned by an operation, errors are distinguished from successful responses by the presence of the `error` property, which contains the inner `TextAnalysisError` object if an error was encountered. For successful result objects, this property is _always_ `undefined`.

For example, to filter out all errors, you could use the following `filter`:

```javascript
const results = await client.analyze("SentimentAnalysis", documents);
const onlySuccessful = results.filter((result) => result.error === undefined);
```

**Note**: TypeScript users can benefit from better type-checking of result and error objects if `compilerOptions.strictNullChecks` is set to `true` in the `tsconfig.json` configuration. For example:

```typescript
const [result] = await client.analyze("SentimentAnalysis", ["Hello world!"]);

if (result.error !== undefined) {
  // In this if block, TypeScript will be sure that the type of `result` is
  // `TextAnalysisError` if compilerOptions.strictNullChecks is enabled in
  // the tsconfig.json

  console.log(result.error);
}
```

## Samples

### Client Usage
* [Actions Batching](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples-dev/batching.ts)
* [Choose Model Version](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples-dev/modelVersion.ts)
* [Paging](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples-dev/paging.ts)
* [Rehydrate Polling](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples-dev/rehydratePolling.ts)
* [Get Statistics](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples-dev/stats.ts)

### Prebuilt Tasks
* [Abstractive Summarization](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples-dev/abstractiveSummarization.ts)
* [Language Detection](https://github.com/azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/Samples.md#language-detection)
* [Entity Linking](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples-dev/entityLinking.ts)
* [Entity Regconition](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples-dev/entityRecognition.ts)
* [Extractive Summarization](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples-dev/extractiveSummarization.ts)
* [Healthcare Analysis](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples-dev/healthcare.ts)
* [Key Phrase Extraction](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples-dev/keyPhraseExtraction.ts)
* [Language Detection](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples-dev/languageDetection.ts)
* [Opinion Mining](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples-dev/opinionMining.ts)
* [PII Entity Recognition](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples-dev/piiEntityRecognition.ts)
* [Sentiment Analysis](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples-dev/sentimentAnalysis.ts)

### Custom Tasks
* [Custom Entity Recognition](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples-dev/customEntityRecognition.ts)
* [Custom Single-lable Classfication](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples-dev/customSingleLabelClassification.ts)
* [Custom Multi-lable Classfication](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples-dev/customMultiLabelClassification.ts)

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-text/samples) directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitivelanguage%2Fai-language-text%2FREADME.png)

[cli_docs]: https://learn.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account-cli?tabs=windows#prerequisites
[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[cognitive_resource]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[cognitive_auth]: https://docs.microsoft.com/azure/cognitive-services/authentication
[register_aad_app]: https://docs.microsoft.com/azure/cognitive-services/authentication#assign-a-role-to-a-service-principal
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
[data_limits]: https://docs.microsoft.com/azure/cognitive-services/language-service/concepts/data-limits
[analyze_sentiment_opinion_mining_sample]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-text/samples/v1-beta/javascript/opinionMining.js
[lang_studio]: https://docs.microsoft.com/azure/cognitive-services/language-service/language-studio
