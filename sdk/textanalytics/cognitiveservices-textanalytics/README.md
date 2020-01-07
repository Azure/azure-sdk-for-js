# Azure TextAnalytics client library for JavaScript

[Azure TextAnalytics](https://azure.microsoft.com/en-us/services/cognitive-services/text-analytics/) is a cloud-based service that provides advanced natural language processing over raw text, and includes four main functions: sentiment analysis, key phrase extraction, language detection, and entity recognition.

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

**Prerequisites**: You must have an [Azure Subscription](https://azure.microsoft.com) and an [Cognitive Services](https://docs.microsoft.com/en-us/azure/cognitive-services/cognitive-services-apis-create-account) resource to use this package.

### 1. Install the `@azure/cognitiveservices-textanalytics` package

```bash
npm install @azure/cognitiveservices-textanalytics
```

### 2. Create and authenticate a `TextAnalyticsClient`

TextAnalytics uses both AAD and subscription key for authentication.

Creating a client with a service key:

```js
const client = new TextAnalyticsClient(
  "<endpoint>",
  new CognitiveServicesCredential("<subscription key>")
);
```

## Key concepts

Content still being written.

## Examples

### Detect the language of an input string

```js
const [result] = await client.detectLanguages(["hello world"]);
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
