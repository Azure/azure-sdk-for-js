## Samples

For more samples, check out the [`samples-dev` folder](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-text/samples-dev)

### Entity Resolutions

Recognize and categorize entities in text as people, places, organizations, dates/times, quantities, currencies, etc. The latest beta release can resolve entities to standard formats. Resolutions provide predictable formats for common quantifiable types and can normalize values to a single, well-known format.

The `languageCode` parameter is optional. If it is not specified, the default English model will be used.

```javascript
const { TextAnalysisClient, AzureKeyCredential } = require("@azure/ai-language-text");

const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));

const documents = [
  "Microsoft was founded by Bill Gates and Paul Allen.",
  "Redmond is a city in King County, Washington, United States, located 15 miles east of Seattle.",
  "Jeff bought three dozen eggs because there was a 50% discount.",
];

async function main() {
  const actions = [
    {
      kind: "EntityRecognition",
      modelVersion: "2022-10-01-preview",
    },
  ];
  const poller = await client.beginAnalyzeBatch(actions, documents, "en");
  const results = await poller.pollUntilDone();
  
  for await (const actionResult of results) {
    if (actionResult.kind !== "EntityRecognition") {
      throw new Error(`Expected a EntityRecognition results but got: ${actionResult.kind}`);
    }
    if (actionResult.error) {
      const { code, message } = actionResult.error;
      throw new Error(`Unexpected error (${code}): ${message}`);
    }
    for (const result of actionResult.results) {
      console.log(`- Document ${result.id}`);
      if (result.error) {
        const { code, message } = result.error;
        throw new Error(`Unexpected error (${code}): ${message}`);
      }
      console.log("\tRecognized Entities:");
      for (const entity of result.entities) {
        console.log(`\t- Entity "${entity.text}" of type ${entity.category}`);

        if (entity.resolutions) {
          console.log("\tRecognized Resolution:");
          for (const resolution of entity.resolutions) {
            const { resolutionKind, ...resolutionInfo } = resolution;
            console.log(`\t- Resolution of type ${resolutionKind}`);
            console.log(`\t- Resolution information ${JSON.stringify(resolutionInfo)}`);
          }
        }
      }
    }
  }
}
```

### Sentiment Analysis

Analyze sentiment of text to determine if it is positive, negative, neutral, or mixed, including per-sentence sentiment analysis and confidence scores.

```javascript
const { TextAnalysisClient, AzureKeyCredential } = require("@azure/ai-language-text");

const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));

const documents = [
  "I did not like the restaurant. The food was too spicy.",
  "The restaurant was decorated beautifully. The atmosphere was unlike any other restaurant I've been to.",
  "The food was yummy. :)",
];

async function main() {
  const results = await client.analyze("SentimentAnalysis", documents);

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

### Entity Recognition

Recognize and categorize entities in text as people, places, organizations, dates/times, quantities, currencies, etc.

The `language` parameter is optional. If it is not specified, the default English model will be used.

```javascript
const { TextAnalysisClient, AzureKeyCredential } = require("@azure/ai-language-text");

const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));

const documents = [
  "Microsoft was founded by Bill Gates and Paul Allen.",
  "Redmond is a city in King County, Washington, United States, located 15 miles east of Seattle.",
  "Jeff bought three dozen eggs because there was a 50% discount.",
];

async function main() {
  const results = await client.analyze("EntityRecognition", documents, "en");

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

### PII Entity Recognition

There is a separate action for recognizing Personally Identifiable Information (PII) in text such as Social Security Numbers, bank account information, credit card numbers, etc. Its usage is very similar to the standard entity recognition above:

```javascript
const { TextAnalysisClient, AzureKeyCredential } = require("@azure/ai-language-text");
const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));
const documents = [
  "The employee's SSN is 555-55-5555.",
  "The employee's phone number is (555) 555-5555.",
];
async function main() {
  const results = await client.analyze("PiiEntityRecognition", documents, "en");
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

### Entity Linking

A "Linked" entity is one that exists in a knowledge base (such as Wikipedia). The `EntityLinking` action can disambiguate entities by determining which entry in a knowledge base they likely refer to (for example, in a piece of text, does the word "Mars" refer to the planet, or to the Roman god of war). Linked entities contain associated URLs to the knowledge base that provides the definition of the entity.

```javascript
const { TextAnalysisClient, AzureKeyCredential } = require("@azure/ai-language-text");

const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));

const documents = [
  "Microsoft was founded by Bill Gates and Paul Allen.",
  "Easter Island, a Chilean territory, is a remote volcanic island in Polynesia.",
  "I use Azure Functions to develop my product.",
];

async function main() {
  const results = await client.analyze("EntityLinking", documents, "en");

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

### Key Phrase Extraction

Key Phrase extraction identifies the main talking points in a document. For example, given input text "The food was delicious and there were wonderful staff", the service returns "food" and "wonderful staff".

```javascript
const { TextAnalysisClient, AzureKeyCredential } = require("@azure/ai-language-text");

const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));

const documents = [
  "Redmond is a city in King County, Washington, United States, located 15 miles east of Seattle.",
  "I need to take my cat to the veterinarian.",
  "I will travel to South America in the summer.",
];

async function main() {
  const results = await client.analyze("KeyPhraseExtraction", documents, "en");

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

### Language Detection

Determine the language of a piece of text.

The `countryHint` parameter is optional, but can assist the service in providing correct output if the country of origin is known. If provided, it should be set to an ISO-3166 Alpha-2 two-letter country code (such as "us" for the United States or "jp" for Japan) or to the value `"none"`. If the parameter is not provided, then the default `"us"` (United States) model will be used. If you do not know the country of origin of the document, then the parameter `"none"` should be used, and the Language service will apply a model that is tuned for an unknown country of origin.

To enable script detection, set the `modelVersion` option to `2022-04-20-preview`.

```javascript
const { TextAnalysisClient, AzureKeyCredential } = require("@azure/ai-language-text");

const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));

const documents = [
  "This is written in English.",
  "Il documento scritto in italiano.",
  "Dies ist in deutscher Sprache verfasst.",
];

async function main() {
  const results = await client.analyze("LanguageDetection", documents, "none", {
    modelVersion: "2022-04-10-preview",
  });

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
      if (primaryLanguage.script) {
        console.log(`Detected script: ${primaryLanguage.script}`); 
      }
      if 
    } else {
      console.error("Encountered an error:", result.error);
    }
  }
}

main();
```

### Healthcare Analysis

Healthcare analysis identifies healthcare entities. For example, given input text "Prescribed 100mg ibuprofen, taken twice daily", the service returns "100mg" categorized as Dosage, "ibuprofen" as MedicationName, and "twice daily" as Frequency.

FHIR, or Fast Healthcare Interoperability Resource, is a standard that defines how healthcare information can be exchanged by different computer systems. To receive a FHIR bundle for a particular text document, input `4.0.1` for the `fhirVersion`. You can also pass the `document_type` if the type of document in the source text is known. Supported document types include "ClinicalTrial", "DischargeSumamry", "ProgressNote", and more, which can be found in this [reference docs](https://azuresdkdocs.blob.core.windows.net/$web/python/azure-ai-textanalytics/5.3.0b1/azure.ai.textanalytics.html#azure.ai.textanalytics.HealthcareDocumentType)

```javascript
const { AzureKeyCredential, TextAnalysisClient } = require("@azure/ai-language-text");

const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));

const documents = [
  "Prescribed 100mg ibuprofen, taken twice daily.",
  "Patient does not suffer from high blood pressure.",
];

async function main() {
  const actions = [
    {
      kind: "Healthcare",
      fhirVersion: "4.0.1",
      documentType: KnownHealthcareDocumentType.DischargeSummary,
    },
  ];
  const poller = await client.beginAnalyzeBatch(actions, documents, "en");
  const results = await poller.pollUntilDone();

  for await (const actionResult of results) {
    if (actionResult.kind !== "Healthcare") {
      throw new Error(`Expected a healthcare results but got: ${actionResult.kind}`);
    }
    if (actionResult.error) {
      const { code, message } = actionResult.error;
      throw new Error(`Unexpected error (${code}): ${message}`);
    }
    for (const result of actionResult.results) {
      console.log(`- Document ${result.id}`);
      if (result.error) {
        const { code, message } = result.error;
        throw new Error(`Unexpected error (${code}): ${message}`);
      }

      console.log("\tRecognized Entities:");
      for (const entity of result.entities) {
        console.log(`\t- Entity "${entity.text}" of type ${entity.category}`);
        if (entity.dataSources.length > 0) {
          console.log("\t and it can be referenced in the following data sources:");
          for (const ds of entity.dataSources) {
            console.log(`\t\t- ${ds.name} with Entity ID: ${ds.entityId}`);
          }
        }
      }

      console.log("\tFHIR Bundle:")
      console.log(JSON.stringify(result.fhirBundle, undefined, 4));
    }
  }
}

main();
```

### Extractive Summarization

Extractive summarization identifies sentences that summarize the article they belong to.

```javascript
const { AzureKeyCredential, TextAnalysisClient } = require("@azure/ai-language-text");
const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));
const documents = [
  "<long article>"
];
async function main() {
  const actions = [
    {
      kind: "ExtractiveSummarization",
      maxSentenceCount: 2,
    },
  ];
  const poller = await client.beginAnalyzeBatch(actions, documents, "en");
  const results = await poller.pollUntilDone();

  for await (const actionResult of results) {
    if (actionResult.kind !== "ExtractiveSummarization") {
      throw new Error(`Expected extractive summarization results but got: ${actionResult.kind}`);
    }
    if (actionResult.error) {
      const { code, message } = actionResult.error;
      throw new Error(`Unexpected error (${code}): ${message}`);
    }
    for (const result of actionResult.results) {
      console.log(`- Document ${result.id}`);
      if (result.error) {
        const { code, message } = result.error;
        throw new Error(`Unexpected error (${code}): ${message}`);
      }
      console.log("Summary:");
      console.log(result.sentences.map((sentence) => sentence.text).join("\n"));
    }
  }
}
main();
```

### Abstractive Summarization

Abstractive summarization generates a summary for the input articles. Abstractive summarization is different from extractive summarization in that extractive summarization is the strategy of concatenating extracted sentences from the input document into a summary, while abstractive summarization involves paraphrasing the document using novel sentences. 

To get started, submit a request for access [here](https://aka.ms/applyforgatedsummarizationfeatures).

```javascript
const { AzureKeyCredential, TextAnalysisClient } = require("@azure/ai-language-text");
const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));
const documents = [
  "<long article>"
];
async function main() {
  const actions = [
    {
      kind: "AbstractiveSummarization",
      sentenceCount: 4,
    },
  ];
  const poller = await client.beginAnalyzeBatch(actions, documents, "en");
  const results = await poller.pollUntilDone();

  for await (const actionResult of results) {
    if (actionResult.kind !== "AbstractiveSummarization") {
      throw new Error(`Expected abstractive summarization results but got: ${actionResult.kind}`);
    }
    if (actionResult.error) {
      const { code, message } = actionResult.error;
      throw new Error(`Unexpected error (${code}): ${message}`);
    }
    for (const result of actionResult.results) {
      console.log(`- Document ${result.id}`);
      if (result.error) {
        const { code, message } = result.error;
        throw new Error(`Unexpected error (${code}): ${message}`);
      }
      console.log("\t- Summary:");
      for (const summary of result.summaries) {
        console.log(summary.text);
      }
    }
  }
}
main();
```

### Custom Entity Recognition

Recognize and categorize entities in text as entities using custom entity detection models built using [Azure Language Studio][lang_studio].

```javascript
const { AzureKeyCredential, TextAnalysisClient } = require("@azure/ai-language-text");

const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));

const documents = [
  "We love this trail and make the trip every year. The views are breathtaking and well worth the hike! Yesterday was foggy though, so we missed the spectacular views. We tried again today and it was amazing. Everyone in my family liked the trail although it was too challenging for the less athletic among us.",
  "Last week we stayed at Hotel Foo to celebrate our anniversary. The staff knew about our anniversary so they helped me organize a little surprise for my partner. The room was clean and with the decoration I requested. It was perfect!",
];

async function main() {
  const actions = [
    {
      kind: "CustomEntityRecognition",
      deploymentName,
      projectName,
    },
  ];
  const poller = await client.beginAnalyzeBatch(actions, documents, "en");
  const results = await poller.pollUntilDone();
  
  for await (const actionResult of results) {
    if (actionResult.kind !== "CustomEntityRecognition") {
      throw new Error(`Expected a CustomEntityRecognition results but got: ${actionResult.kind}`);
    }
    if (actionResult.error) {
      const { code, message } = actionResult.error;
      throw new Error(`Unexpected error (${code}): ${message}`);
    }
    for (const result of actionResult.results) {
      console.log(`- Document ${result.id}`);
      if (result.error) {
        const { code, message } = result.error;
        throw new Error(`Unexpected error (${code}): ${message}`);
      }
      console.log("\tRecognized Entities:");
      for (const entity of result.entities) {
        console.log(`\t- Entity "${entity.text}" of type ${entity.category}`);
      }
    }
  }
}

main();
```

### Custom Single-label Classification

Classify documents using custom single-label models built using [Azure Language Studio][lang_studio].

```javascript
const { TextAnalysisClient, AzureKeyCredential } = require("@azure/ai-language-text");

const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));

const documents = [
  "The plot begins with a large group of characters where everyone thinks that the two main ones should be together but foolish things keep them apart. Misunderstandings, miscommunication, and confusion cause a series of humorous situations.",
];

async function main() {
  const actions = [
    {
      kind: "CustomSingleLabelClassification",
      deploymentName,
      projectName,
    },
  ];
  const poller = await client.beginAnalyzeBatch(actions, documents, "en");
  const results = await poller.pollUntilDone();

  for await (const actionResult of results) {
    if (actionResult.kind !== "CustomSingleLabelClassification") {
      throw new Error(
        `Expected a CustomSingleLabelClassification results but got: ${actionResult.kind}`
      );
    }
    if (actionResult.error) {
      const { code, message } = actionResult.error;
      throw new Error(`Unexpected error (${code}): ${message}`);
    }
    for (const result of actionResult.results) {
      console.log(`- Document ${result.id}`);
      if (result.error) {
        const { code, message } = result.error;
        throw new Error(`Unexpected error (${code}): ${message}`);
      }
      console.log(`\tClassification: ${result.classifications[0].category}`);
    }
  }
}

main();
```

### Custom Multi-label Classification

Classify documents using custom multi-label models built using [Azure Language Studio][lang_studio].

```javascript
const { AzureKeyCredential, TextAnalysisClient } = require("@azure/ai-language-text");

const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));

const documents = [
  "The plot begins with a large group of characters where everyone thinks that the two main ones should be together but foolish things keep them apart. Misunderstandings, miscommunication, and confusion cause a series of humorous situations.",
];

async function main() {
  const actions = [
    {
      kind: "CustomMultiLabelClassification",
      deploymentName,
      projectName,
    },
  ];
  const poller = await client.beginAnalyzeBatch(actions, documents, "en");
  const results = await poller.pollUntilDone();

  for await (const actionResult of results) {
    if (actionResult.kind !== "CustomMultiLabelClassification") {
      throw new Error(
        `Expected a CustomMultiLabelClassification results but got: ${actionResult.kind}`
      );
    }
    if (actionResult.error) {
      const { code, message } = actionResult.error;
      throw new Error(`Unexpected error (${code}): ${message}`);
    }
    for (const result of actionResult.results) {
      console.log(`- Document ${result.id}`);
      if (result.error) {
        const { code, message } = result.error;
        throw new Error(`Unexpected error (${code}): ${message}`);
      }
      console.log(`\tClassification:`);
      for (const classification of result.classifications) {
        console.log(`\t\t-category: ${classification.category}`);
      }
    }
  }
}

main();
```

### Action Batching

Applies multiple actions on each input document in one service request.

```javascript
const { AzureKeyCredential, TextAnalysisClient } = require("@azure/ai-language-text");

const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));

const documents = [
  "Microsoft was founded by Bill Gates and Paul Allen.",
  "The employee's SSN is 555-55-5555.",
  "Easter Island, a Chilean territory, is a remote volcanic island in Polynesia.",
  "I use Azure Functions to develop my product.",
];

async function main() {
  const actions = [
    {
      kind: "EntityRecognition",
      modelVersion: "latest",
    },
    {
      kind: "PiiEntityRecognition",
      modelVersion: "latest",
    },
    {
      kind: "KeyPhraseExtraction",
      modelVersion: "latest",
    },
  ];
  const poller = await client.beginAnalyzeBatch(actions, documents, "en");
  const actionResults = await poller.pollUntilDone();

  for await (const actionResult of actionResults) {
    if (actionResult.error) {
      const { code, message } = actionResult.error;
      throw new Error(`Unexpected error (${code}): ${message}`);
    }
    switch (actionResult.kind) {
      case "KeyPhraseExtraction": {
        for (const doc of actionResult.results) {
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
        break;
      }
      case "EntityRecognition": {
        for (const doc of actionResult.results) {
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
        break;
      }
      case "PiiEntityRecognition": {
        for (const doc of actionResult.results) {
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
        break;
      }
      default: {
        throw new Error(`Unexpected action results: ${actionResult.kind}`);
      }
    }
  }
}

main();
```

### Automatic Language Detection

Automatically detect the language of a piece of text. This is a complementary feature to the existing action. It can be enabled by setting `languageCode` to `auto`, a parameter to `beginAnalyzeBatch` method. 

The sample below enables automatic language detection feature for an abstractive summarization task.

```javascript
const { TextAnalysisClient, AzureKeyCredential } = require("@azure/ai-language-text");

const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));

const documents = [
  "Microsoft was founded by Bill Gates and Paul Allen.",
  "Mon amie vit à Seattle",
  "Ich besuchte Deutsch während Weihnachten",
];

async function main() {
  const actions: AnalyzeBatchAction[] = [
    {
      kind: "EntityRecognition",
    },
  ];

  const poller = await client.beginAnalyzeBatch(actions, documents, "auto");
  const results = await poller.pollUntilDone();

  for await (const actionResult of results) {
    if (actionResult.kind !== "Entity Recognition") {
      throw new Error(`Expected entity recognition results but got: ${actionResult.kind}`);
    }
    if (actionResult.error) {
      const { code, message } = actionResult.error;
      throw new Error(`Unexpected error (${code}): ${message}`);
    }

    for (const result of actionResult.results) {
      console.log(`- Document ${result.id}`);
      if (result.error) {
        const { code, message } = result.error;
        throw new Error(`Unexpected error (${code}): ${message}`);
      }

      if (result.detectedLanguage) {
        const { name, iso6391Name, confidenceScore } = result.detectedLanguage;
        console.log(
          "Document language identified as",
          name,
          "( ISO6391:",
          iso6391Name,
          ", Score:",
          confidenceScore,
          ")"
        );
      }

      console.log("\tRecognized Entities:");
      for (const entity of result.entities) {
        console.log(`\t- Entity ${entity.text} of type ${entity.category}`);
      }
    }
  }
}
main();
```
