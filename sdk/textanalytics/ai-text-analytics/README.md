# Azure Text Analytics client library for JavaScript

[Azure TextAnalytics](https://azure.microsoft.com/services/cognitive-services/text-analytics/) is a cloud-based service that provides advanced natural language processing over raw text, and includes six main functions:

**Note:** This SDK targets Azure Text Analytics service API version 3.1.0.

- Language Detection
- Sentiment Analysis
- Key Phrase Extraction
- Named Entity Recognition
- Recognition of Personally Identifiable Information
- Linked Entity Recognition
- Healthcare Analysis
- Support Multiple Actions Per Document

Use the client library to:

- Detect what language input text is written in.
- Determine what customers think of your brand or topic by analyzing raw text for clues about positive or negative sentiment.
- Automatically extract key phrases to quickly identify the main points.
- Identify and categorize entities in your text as people, places, organizations, date/time, quantities, percentages, currencies, healthcare specific, and more.
- Perform multiple of the above tasks at once.

Key links:
- [Source code](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/textanalytics/ai-text-analytics/)
- [Package (NPM)](https://www.npmjs.com/package/@azure/ai-text-analytics)
- [API reference documentation](https://docs.microsoft.com/javascript/api/@azure/ai-text-analytics)
- [Product documentation](https://docs.microsoft.com/azure/cognitive-services/text-analytics/)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/textanalytics/ai-text-analytics/samples)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing [Cognitive Services][cognitive_resource] or Text Analytics resource. If you need to create the resource, you can use the [Azure Portal][azure_portal] or [Azure CLI][azure_cli].

If you use the Azure CLI, replace `<your-resource-group-name>` and `<your-resource-name>` with your own unique names:

```PowerShell
az cognitiveservices account create --kind TextAnalytics --resource-group <your-resource-group-name> --name <your-resource-name> --sku <your-sku-name> --location <your-location>
```

### Install the `@azure/ai-text-analytics` package

Install the Azure Text Analytics client library for JavaScript with `npm`:

```bash
npm install @azure/ai-text-analytics
```

### Create and authenticate a `TextAnalyticsClient`

To create a client object to access the Text Analytics API, you will need the `endpoint` of your Text Analytics resource and a `credential`. The Text Analytics client can use either Azure Active Directory credentials or an API key credential to authenticate.

You can find the endpoint for your text analytics resource either in the [Azure Portal][azure_portal] or by using the [Azure CLI][azure_cli] snippet below:

```bash
az cognitiveservices account show --name <your-resource-name> --resource-group <your-resource-group-name> --query "endpoint"
```

#### Using an API Key

Use the [Azure Portal][azure_portal] to browse to your Text Analytics resource and retrieve an API key, or use the [Azure CLI][azure_cli] snippet below:

**Note:** Sometimes the API key is referred to as a "subscription key" or "subscription API key."

```PowerShell
az cognitiveservices account keys list --resource-group <your-resource-group-name> --name <your-resource-name>
```

Once you have an API key and endpoint, you can use the `AzureKeyCredential` class to authenticate the client as follows:

```javascript
const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

const client = new TextAnalyticsClient("<endpoint>", new AzureKeyCredential("<API key>"));
```

#### Using an Azure Active Directory Credential

Client API key authentication is used in most of the examples, but you can also authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below,
or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to [register a new AAD application][register_aad_app] and grant access to Text Analytics by assigning the `"Cognitive Services User"` role to your service principal (note: other roles such as `"Owner"` will not grant the necessary permissions, only `"Cognitive Services User"` will suffice to run the examples and the sample code).

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

```javascript
const { TextAnalyticsClient } = require("@azure/ai-text-analytics");
const { DefaultAzureCredential } = require("@azure/identity");

const client = new TextAnalyticsClient("<endpoint>", new DefaultAzureCredential());
```

## Key concepts

### TextAnalyticsClient

`TextAnalyticsClient` is the primary interface for developers using the Text Analytics client library. Explore the methods on this client object to understand the different features of the Text Analytics service that you can access.

### Input

A **document** represents a single unit of input to be analyzed by the predictive models in the Text Analytics service. Operations on `TextAnalyticsClient` take a collection of inputs to be analyzed as a batch. The operation methods have overloads that allow the inputs to be represented as strings, or as objects with attached metadata.

For example, each document can be passed as a string in an array, e.g.

```typescript
const documents = [
  "I hated the movie. It was so slow!",
  "The movie made it into my top ten favorites.",
  "What a great movie!"
];
```

or, if you wish to pass in a per-item document `id` or `language`/`countryHint`, they can be given as a list of `TextDocumentInput` or `DetectLanguageInput` depending on the operation;

```javascript
const textDocumentInputs = [
  { id: "1", language: "en", text: "I hated the movie. It was so slow!" },
  { id: "2", language: "en", text: "The movie made it into my top ten favorites." },
  { id: "3", language: "en", text: "What a great movie!" }
];
```

See [service limitations][data_limits] for the input, including document length limits, maximum batch size, and supported text encodings.

### Return Value

The return value corresponding to a single document is either a successful result or an error object. Each `TextAnalyticsClient` method returns a heterogeneous array of results and errors that correspond to the inputs by index. A text input and its result will have the same index in the input and result collections. The collection may also optionally include information about the input batch and how it was processed in the `statistics` field.

An **result**, such as `AnalyzeSentimentResult`, is the result of a Text Analytics operation, containing a prediction or predictions about a single text input. An operation's result type also may optionally include information about the input document and how it was processed.

The **error** object, `TextAnalyticsErrorResult`, indicates that the service encountered an error while processing the document and contains information about the error.

### Document Error Handling

In the collection returned by an operation, errors are distinguished from successful responses by the presence of the `error` property, which contains the inner `TextAnalyticsError` object if an error was encountered. For successful result objects, this property is _always_ `undefined`.

For example, to filter out all errors, you could use the following `filter`:

```javascript
const results = await client.analyzeSentiment(documents);
const onlySuccessful = results.filter((result) => result.error === undefined);
```

**Note**: TypeScript users can benefit from better type-checking of result and error objects if `compilerOptions.strictNullChecks` is set to `true` in the `tsconfig.json` configuration. For example:

```typescript
const [result] = await client.analyzeSentiment(["Hello world!"]);

if (result.error !== undefined) {
  // In this if block, TypeScript will be sure that the type of `result` is
  // `TextAnalyticsError` if compilerOptions.strictNullChecks is enabled in
  // the tsconfig.json

  console.log(result.error);
}
```

This capability was introduced in TypeScript 3.2, so users of TypeScript 3.1 must cast result values to their corresponding success variant as follows:

```typescript
const [result] = await client.detectLanguage(["Hello world!"]);

if (result.error === undefined) {
  const { primaryLanguage } = result as DetectLanguageSuccessResult;
}
```

## Examples

### Analyze Sentiment

Analyze sentiment of text to determine if it is positive, negative, neutral, or mixed, including per-sentence sentiment analysis and confidence scores.

```javascript
const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

const client = new TextAnalyticsClient("<endpoint>", new AzureKeyCredential("<API key>"));

const documents = [
  "I did not like the restaurant. The food was too spicy.",
  "The restaurant was decorated beautifully. The atmosphere was unlike any other restaurant I've been to.",
  "The food was yummy. :)"
];

async function main() {
  const results = await client.analyzeSentiment(documents);

  for (const result of results) {
    if (result.error === undefined) {
      console.log("Overall sentiment:", result.sentiment);
      console.log("Scores:", result.confidenceScores);
    } else {
      console.error("Encountered an error:", result.error);
    }
  }
}

main();
```

To get more granular information about the opinions related to aspects of a product/service, also known as Aspect-based Sentiment Analysis in Natural Language Processing (NLP), see a sample on sentiment analysis with opinion mining [here][analyze_sentiment_opinion_mining_sample].

### Recognize Entities

Recognize and categorize entities in text as people, places, organizations, dates/times, quantities, currencies, etc.

The `language` parameter is optional. If it is not specified, the default English model will be used.

```javascript
const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

const client = new TextAnalyticsClient("<endpoint>", new AzureKeyCredential("<API key>"));

const documents = [
  "Microsoft was founded by Bill Gates and Paul Allen.",
  "Redmond is a city in King County, Washington, United States, located 15 miles east of Seattle.",
  "Jeff bought three dozen eggs because there was a 50% discount."
];

async function main() {
  const results = await client.recognizeEntities(documents, "en");

  for (const result of results) {
    if (result.error === undefined) {
      console.log(" -- Recognized entities for input", result.id, "--");
      for (const entity of result.entities) {
        console.log(entity.text, ":", entity.category, "(Score:", entity.confidenceScore, ")");
      }
    } else {
      console.error("Encountered an error:", result.error);
    }
  }
}

main();
```

### Recognize PII Entities

There is a separate endpoint and operation for recognizing Personally Identifiable Information (PII) in text such as Social Security Numbers, bank account information, credit card numbers, etc. Its usage is very similar to the standard entity recognition above:

```javascript
const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");
const client = new TextAnalyticsClient("<endpoint>", new AzureKeyCredential("<API key>"));
const documents = [
  "The employee's SSN is 555-55-5555.",
  "The employee's phone number is (555) 555-5555."
];
async function main() {
  const results = await client.recognizePiiEntities(documents, "en");
  for (const result of results) {
    if (result.error === undefined) {
      console.log(" -- Recognized PII entities for input", result.id, "--");
      for (const entity of result.entities) {
        console.log(entity.text, ":", entity.category, "(Score:", entity.confidenceScore, ")");
      }
    } else {
      console.error("Encountered an error:", result.error);
    }
  }
}
main();
```

### Recognize Linked Entities

A "Linked" entity is one that exists in a knowledge base (such as Wikipedia). The `recognizeLinkedEntities` operation can disambiguate entities by determining which entry in a knowledge base they likely refer to (for example, in a piece of text, does the word "Mars" refer to the planet, or to the Roman god of war). Linked entities contain associated URLs to the knowledge base that provides the definition of the entity.

```javascript
const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

const client = new TextAnalyticsClient("<endpoint>", new AzureKeyCredential("<API key>"));

const documents = [
  "Microsoft was founded by Bill Gates and Paul Allen.",
  "Easter Island, a Chilean territory, is a remote volcanic island in Polynesia.",
  "I use Azure Functions to develop my product."
];

async function main() {
  const results = await client.recognizeLinkedEntities(documents, "en");

  for (const result of results) {
    if (result.error === undefined) {
      console.log(" -- Recognized linked entities for input", result.id, "--");
      for (const entity of result.entities) {
        console.log(entity.name, "(URL:", entity.url, ", Source:", entity.dataSource, ")");
        for (const match of entity.matches) {
          console.log(
            "  Occurrence:",
            '"' + match.text + '"',
            "(Score:",
            match.confidenceScore,
            ")"
          );
        }
      }
    } else {
      console.error("Encountered an error:", result.error);
    }
  }
}

main();
```

### Extract Key Phrases

Key Phrase extraction identifies the main talking points in a document. For example, given input text "The food was delicious and there were wonderful staff", the service returns "food" and "wonderful staff".

```javascript
const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

const client = new TextAnalyticsClient("<endpoint>", new AzureKeyCredential("<API key>"));

const documents = [
  "Redmond is a city in King County, Washington, United States, located 15 miles east of Seattle.",
  "I need to take my cat to the veterinarian.",
  "I will travel to South America in the summer."
];

async function main() {
  const results = await client.extractKeyPhrases(documents, "en");

  for (const result of results) {
    if (result.error === undefined) {
      console.log(" -- Extracted key phrases for input", result.id, "--");
      console.log(result.keyPhrases);
    } else {
      console.error("Encountered an error:", result.error);
    }
  }
}

main();
```

### Detect Language

Determine the language of a piece of text.

The `countryHint` parameter is optional, but can assist the service in providing correct output if the country of origin is known. If provided, it should be set to an ISO-3166 Alpha-2 two-letter country code (such as "us" for the United States or "jp" for Japan) or to the value `"none"`. If the parameter is not provided, then the default `"us"` (United States) model will be used. If you do not know the country of origin of the document, then the parameter `"none"` should be used, and the Text Analytics service will apply a model that is tuned for an unknown country of origin.

```javascript
const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

const client = new TextAnalyticsClient("<endpoint>", new AzureKeyCredential("<API key>"));

const documents = [
  "This is written in English.",
  "Il documento scritto in italiano.",
  "Dies ist in deutscher Sprache verfasst."
];

async function main() {
  const results = await client.detectLanguage(documents, "none");

  for (const result of results) {
    if (result.error === undefined) {
      const { primaryLanguage } = result;
      console.log(
        "Input #",
        result.id,
        "identified as",
        primaryLanguage.name,
        "( ISO6391:",
        primaryLanguage.iso6391Name,
        ", Score:",
        primaryLanguage.confidenceScore,
        ")"
      );
    } else {
      console.error("Encountered an error:", result.error);
    }
  }
}

main();
```

### Analyze Healthcare Entities

Healthcare analysis identifies healthcare entities. For example, given input text "Prescribed 100mg ibuprofen, taken twice daily", the service returns "100mg" categorized as Dosage, "ibuprofen" as MedicationName, and "twice daily" as Frequency.

```javascript
const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

const client = new TextAnalyticsClient("<endpoint>", new AzureKeyCredential("<API key>"));

const documents = [
  "Prescribed 100mg ibuprofen, taken twice daily.",
  "Patient does not suffer from high blood pressure."
];

async function main() {
  const poller = await client.beginAnalyzeHealthcareEntities(documents);
  const results = await poller.pollUntilDone();

  for await (const result of results) {
    console.log(`- Document ${result.id}`);
    if (!result.error) {
      console.log("\tRecognized Entities:");
      for (const entity of result.entities) {
        console.log(`\t- Entity ${entity.text} of type ${entity.category}`);
      }
    } else console.error("\tError:", result.error);
  }
}

main();
```

### Analyze Actions

Analyze actions enables the application of multiple analyses (named actions) at once.

```javascript
const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

const client = new TextAnalyticsClient("<endpoint>", new AzureKeyCredential("<API key>"));

const documents = [
  "Microsoft was founded by Bill Gates and Paul Allen.",
  "The employee's SSN is 555-55-5555.",
  "Easter Island, a Chilean territory, is a remote volcanic island in Polynesia.",
  "I use Azure Functions to develop my product."
];

async function main() {
  const actions = {
    recognizeEntitiesActions: [{ modelVersion: "latest" }],
    recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
    extractKeyPhrasesActions: [{ modelVersion: "latest" }]
  };
  const poller = await client.beginAnalyzeActions(documents, actions);
  const resultPages = await poller.pollUntilDone();
  for await (const page of resultPages) {
    const keyPhrasesAction = page.extractKeyPhrasesResults[0];
    if (!keyPhrasesAction.error) {
      for (const doc of keyPhrasesAction.results) {
        console.log(`- Document ${doc.id}`);
        if (!doc.error) {
          console.log("\tKey phrases:");
          for (const phrase of doc.keyPhrases) {
            console.log(`\t- ${phrase}`);
          }
        } else {
          console.error("\tError:", doc.error);
        }
      }
    }

    const entitiesAction = page.recognizeEntitiesResults[0];
    if (!entitiesAction.error) {
      for (const doc of entitiesAction.results) {
        console.log(`- Document ${doc.id}`);
        if (!doc.error) {
          console.log("\tEntities:");
          for (const entity of doc.entities) {
            console.log(`\t- Entity ${entity.text} of type ${entity.category}`);
          }
        } else {
          console.error("\tError:", doc.error);
        }
      }
    }

    const piiEntitiesAction = page.recognizePiiEntitiesResults[0];
    if (!piiEntitiesAction.error) {
      for (const doc of piiEntitiesAction.results) {
        console.log(`- Document ${doc.id}`);
        if (!doc.error) {
          console.log("\tPii Entities:");
          for (const entity of doc.entities) {
            console.log(`\t- Entity ${entity.text} of type ${entity.category}`);
          }
        } else {
          console.error("\tError:", doc.error);
        }
      }
    }
  }
}

main();
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/textanalytics/ai-text-analytics/samples) directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Ftextanalytics%2Fai-text-analytics%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[cognitive_resource]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[cognitive_auth]: https://docs.microsoft.com/azure/cognitive-services/authentication
[register_aad_app]: https://docs.microsoft.com/azure/cognitive-services/authentication#assign-a-role-to-a-service-principal
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
[data_limits]: https://docs.microsoft.com/azure/cognitive-services/text-analytics/overview#data-limits
[analyze_sentiment_opinion_mining_sample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/textanalytics/ai-text-analytics/samples/v5/typescript/src/analyzeSentimentWithOpinionMining.ts
