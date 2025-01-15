## Samples

For more samples, check out the [`samples-dev` folder](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-text/samples-dev)

### Entity Recognition

Recognize and categorize entities in text as people, places, organizations, dates/times, quantities, currencies, etc.

The `languageCode` parameter is optional. If it is not specified, the default English model will be used.

```ts snippet:Sample_EntityRecognition
import { TextAnalysisClient } from "@azure/ai-language-text";
import { AzureKeyCredential } from "@azure/core-auth";

const documents = [
  "Microsoft was founded by Bill Gates and Paul Allen.",
  "I had a wonderful trip to Seattle last week.",
  "I visited the Space Needle 2 times.",
];

const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));

const results = await client.analyze("EntityRecognition", documents);

for (const result of results) {
  console.log(`- Document ${result.id}`);
  if (!result.error) {
    console.log("\tRecognized Entities:");
    for (const entity of result.entities) {
      console.log(`\t- Entity ${entity.text} of type ${entity.category}`);
    }
  } else console.error("\tError:", result.error);
}
```

### Sentiment Analysis

Analyze sentiment of text to determine if it is positive, negative, neutral, or mixed, including per-sentence sentiment analysis and confidence scores.

```ts snippet:Sample_SentimentAnalysis
import { TextAnalysisClient } from "@azure/ai-language-text";
import { AzureKeyCredential } from "@azure/core-auth";

const documents = [
  "I had the best day of my life.",
  "This was a waste of my time. The speaker put me to sleep.",
];

const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));

const results = await client.analyze("SentimentAnalysis", documents);

for (let i = 0; i < results.length; i++) {
  const result = results[i];
  console.log(`- Document ${result.id}`);
  if (!result.error) {
    console.log(`\tDocument text: ${documents[i]}`);
    console.log(`\tOverall Sentiment: ${result.sentiment}`);
    console.log("\tSentiment confidence scores: ", result.confidenceScores);
    console.log("\tSentences");
    for (const { sentiment, confidenceScores, text } of result.sentences) {
      console.log(`\t- Sentence text: ${text}`);
      console.log(`\t  Sentence sentiment: ${sentiment}`);
      console.log("\t  Confidence scores:", confidenceScores);
    }
  } else {
    console.error(`  Error: ${result.error}`);
  }
}
```

To get more granular information about the opinions related to aspects of a product/service, also known as Aspect-based Sentiment Analysis in Natural Language Processing (NLP), see a sample on sentiment analysis with opinion mining [here][analyze_sentiment_opinion_mining_sample].

### PII Entity Recognition

There is a separate action for recognizing Personally Identifiable Information (PII) in text such as Social Security Numbers, bank account information, credit card numbers, etc. Its usage is very similar to the standard entity recognition above:

```ts snippet:Sample_PIIEntityRecognition
import { TextAnalysisClient } from "@azure/ai-language-text";
import { AzureKeyCredential } from "@azure/core-auth";

const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));

const documents = ["My phone number is 555-5555"];

const [result] = await client.analyze("PiiEntityRecognition", documents, "en", {
  domainFilter: KnownPiiEntityDomain.Phi,
  categoriesFilter: [
    KnownPiiEntityCategory.PhoneNumber,
    KnownPiiEntityCategory.USSocialSecurityNumber,
  ],
});

if (!result.error) {
  console.log(`Redacted text: "${result.redactedText}"`);
  console.log("Pii Entities: ");
  for (const entity of result.entities) {
    console.log(`\t- "${entity.text}" of type ${entity.category}`);
  }
}
```

### Entity Linking

A "Linked" entity is one that exists in a knowledge base (such as Wikipedia). The `EntityLinking` action can disambiguate entities by determining which entry in a knowledge base they likely refer to (for example, in a piece of text, does the word "Mars" refer to the planet, or to the Roman god of war). Linked entities contain associated URLs to the knowledge base that provides the definition of the entity.

```ts snippet:Sample_EntityLinking
import { TextAnalysisClient } from "@azure/ai-language-text";
import { AzureKeyCredential } from "@azure/core-auth";

const documents = [
  "Microsoft moved its headquarters to Bellevue, Washington in January 1979.",
  "Steve Ballmer stepped down as CEO of Microsoft and was succeeded by Satya Nadella.",
];

const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));

const results = await client.analyze("EntityLinking", documents);

for (const result of results) {
  console.log(`- Document ${result.id}`);
  if (!result.error) {
    console.log("\tEntities:");
    for (const entity of result.entities) {
      console.log(
        `\t- Entity ${entity.name}; link ${entity.url}; datasource: ${entity.dataSource}`,
      );
      console.log("\t\tMatches:");
      for (const match of entity.matches) {
        console.log(
          `\t\t- Entity appears as "${match.text}" (confidence: ${match.confidenceScore}`,
        );
      }
    }
  } else {
    console.error("  Error:", result.error);
  }
}
```

### Key Phrase Extraction

Key Phrase extraction identifies the main talking points in a document. For example, given input text "The food was delicious and there were wonderful staff", the service returns "food" and "wonderful staff".

```ts snippet:Sample_KeyPhraseExtraction
import { TextAnalysisClient } from "@azure/ai-language-text";
import { AzureKeyCredential } from "@azure/core-auth";

const documents = [
  "Redmond is a city in King County, Washington, United States, located 15 miles east of Seattle.",
  "I need to take my cat to the veterinarian.",
  "I will travel to South America in the summer.",
];

const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));

const results = await client.analyze("KeyPhraseExtraction", documents);

for (const result of results) {
  console.log(`- Document ${result.id}`);
  if (!result.error) {
    console.log("\tKey phrases:");
    for (const phrase of result.keyPhrases) {
      console.log(`\t- ${phrase}`);
    }
  } else {
    console.error("  Error:", result.error);
  }
}
```

### Language Detection

Determine the language of a piece of text.

The `countryHint` parameter is optional, but can assist the service in providing correct output if the country of origin is known. If provided, it should be set to an ISO-3166 Alpha-2 two-letter country code (such as "us" for the United States or "jp" for Japan) or to the value `"none"`. If the parameter is not provided, then the default `"us"` (United States) model will be used. If you do not know the country of origin of the document, then the parameter `"none"` should be used, and the Language service will apply a model that is tuned for an unknown country of origin.

```ts snippet:Sample_LanguageDetection
import { TextAnalysisClient } from "@azure/ai-language-text";
import { AzureKeyCredential } from "@azure/core-auth";

const documents = [
  "This document is written in English.",
  "Este es un document escrito en Español.",
  "这是一个用中文写的文件",
  "Dies ist ein Dokument in deutsche Sprache.",
  "Detta är ett dokument skrivet på engelska.",
];

const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));

const result = await client.analyze("LanguageDetection", documents, "us", {
  modelVersion: "2022-04-10-preview",
});

for (const doc of result) {
  if (!doc.error) {
    console.log(
      `Primary language: ${doc.primaryLanguage.name} (iso6391 name: ${doc.primaryLanguage.iso6391Name})`,
    );
  }
}
```

### Healthcare Analysis

Healthcare analysis identifies healthcare entities. For example, given input text "Prescribed 100mg ibuprofen, taken twice daily", the service returns "100mg" categorized as Dosage, "ibuprofen" as MedicationName, and "twice daily" as Frequency.

```ts snippet:Sample_HealthcareAnalysis
import { TextAnalysisClient } from "@azure/ai-language-text";
import { AzureKeyCredential } from "@azure/core-auth";

const documents = [
  "The patient is a 54-year-old gentleman with a history of progressive angina over the past several months.",
  "Prescribed 100mg ibuprofen, taken twice daily.",
  "Patient does not suffer from high blood pressure.",
];

const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));

const actions: AnalyzeBatchAction[] = [
  {
    kind: "Healthcare",
  },
];
const poller = await client.beginAnalyzeBatch(actions, documents, "en");

poller.onProgress(() => {
  console.log(
    `Last time the operation was updated was on: ${poller.getOperationState().modifiedOn}`,
  );
});
console.log(`The operation was created on ${poller.getOperationState().createdOn}`);
console.log(`The operation results will expire on ${poller.getOperationState().expiresOn}`);

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
    if (result.entityRelations.length > 0) {
      console.log(`\tRecognized relations between entities:`);
      for (const relation of result.entityRelations) {
        console.log(
          `\t\t- Relation of type ${relation.relationType} found between the following entities:`,
        );
        for (const role of relation.roles) {
          console.log(`\t\t\t- "${role.entity.text}" with the role ${role.name}`);
        }
      }
    }
  }
}
```

### Extractive Summarization

Extractive summarization identifies sentences that summarize the article they belong to.

```ts snippet:Sample_ExtractiveSummarization
import { TextAnalysisClient } from "@azure/ai-language-text";
import { AzureKeyCredential } from "@azure/core-auth";

const documents = [
  `
           Windows 365 was in the works before COVID-19 sent companies around the world on a scramble to secure solutions to support employees suddenly forced to work from home, but “what really put the firecracker behind it was the pandemic, it accelerated everything,” McKelvey said. She explained that customers were asking, “’How do we create an experience for people that makes them still feel connected to the company without the physical presence of being there?”
           In this new world of Windows 365, remote workers flip the lid on their laptop, bootup the family workstation or clip a keyboard onto a tablet, launch a native app or modern web browser and login to their Windows 365 account. From there, their Cloud PC appears with their background, apps, settings and content just as they left it when they last were last there – in the office, at home or a coffee shop.
           “And then, when you’re done, you’re done. You won’t have any issues around security because you’re not saving anything on your device,” McKelvey said, noting that all the data is stored in the cloud.
           The ability to login to a Cloud PC from anywhere on any device is part of Microsoft’s larger strategy around tailoring products such as Microsoft Teams and Microsoft 365 for the post-pandemic hybrid workforce of the future, she added. It enables employees accustomed to working from home to continue working from home; it enables companies to hire interns from halfway around the world; it allows startups to scale without requiring IT expertise.
           “I think this will be interesting for those organizations who, for whatever reason, have shied away from virtualization. This is giving them an opportunity to try it in a way that their regular, everyday endpoint admin could manage,” McKelvey said.
           The simplicity of Windows 365 won over Dean Wells, the corporate chief information officer for the Government of Nunavut. His team previously attempted to deploy a traditional virtual desktop infrastructure and found it inefficient and unsustainable given the limitations of low-bandwidth satellite internet and the constant need for IT staff to manage the network and infrastructure.
           We didn’t run it for very long,” he said. “It didn’t turn out the way we had hoped. So, we actually had terminated the project and rolled back out to just regular PCs.”
           He re-evaluated this decision after the Government of Nunavut was hit by a ransomware attack in November 2019 that took down everything from the phone system to the government’s servers. Microsoft helped rebuild the system, moving the government to Teams, SharePoint, OneDrive and Microsoft 365. Manchester’s team recruited the Government of Nunavut to pilot Windows 365. Wells was intrigued, especially by the ability to manage the elastic workforce securely and seamlessly.
           “The impact that I believe we are finding, and the impact that we’re going to find going forward, is being able to access specialists from outside the territory and organizations outside the territory to come in and help us with our projects, being able to get people on staff with us to help us deliver the day-to-day expertise that we need to run the government,” he said.
           “Being able to improve healthcare, being able to improve education, economic development is going to improve the quality of life in the communities.”`,
];

const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));

const actions: AnalyzeBatchAction[] = [
  {
    kind: "ExtractiveSummarization",
    maxSentenceCount: 2,
  },
];
const poller = await client.beginAnalyzeBatch(actions, documents, "en");

poller.onProgress(() => {
  console.log(
    `Last time the operation was updated was on: ${poller.getOperationState().modifiedOn}`,
  );
});
console.log(`The operation was created on ${poller.getOperationState().createdOn}`);
console.log(`The operation results will expire on ${poller.getOperationState().expiresOn}`);

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
```

### Abstractive Summarization

Abstractive summarization generates a summary for the input articles. Abstractive summarization is different from extractive summarization in that extractive summarization is the strategy of concatenating extracted sentences from the input document into a summary, while abstractive summarization involves paraphrasing the document using novel sentences.

```ts snippet:Sample_AbstractiveSummarization
import { TextAnalysisClient } from "@azure/ai-language-text";
import { AzureKeyCredential } from "@azure/core-auth";

const documents = [
  `
           Windows 365 was in the works before COVID-19 sent companies around the world on a scramble to secure solutions to support employees suddenly forced to work from home, but “what really put the firecracker behind it was the pandemic, it accelerated everything,” McKelvey said. She explained that customers were asking, “’How do we create an experience for people that makes them still feel connected to the company without the physical presence of being there?”
           In this new world of Windows 365, remote workers flip the lid on their laptop, bootup the family workstation or clip a keyboard onto a tablet, launch a native app or modern web browser and login to their Windows 365 account. From there, their Cloud PC appears with their background, apps, settings and content just as they left it when they last were last there – in the office, at home or a coffee shop.
           “And then, when you’re done, you’re done. You won’t have any issues around security because you’re not saving anything on your device,” McKelvey said, noting that all the data is stored in the cloud.
           The ability to login to a Cloud PC from anywhere on any device is part of Microsoft’s larger strategy around tailoring products such as Microsoft Teams and Microsoft 365 for the post-pandemic hybrid workforce of the future, she added. It enables employees accustomed to working from home to continue working from home; it enables companies to hire interns from halfway around the world; it allows startups to scale without requiring IT expertise.
           “I think this will be interesting for those organizations who, for whatever reason, have shied away from virtualization. This is giving them an opportunity to try it in a way that their regular, everyday endpoint admin could manage,” McKelvey said.
           The simplicity of Windows 365 won over Dean Wells, the corporate chief information officer for the Government of Nunavut. His team previously attempted to deploy a traditional virtual desktop infrastructure and found it inefficient and unsustainable given the limitations of low-bandwidth satellite internet and the constant need for IT staff to manage the network and infrastructure.
           We didn’t run it for very long,” he said. “It didn’t turn out the way we had hoped. So, we actually had terminated the project and rolled back out to just regular PCs.”
           He re-evaluated this decision after the Government of Nunavut was hit by a ransomware attack in November 2019 that took down everything from the phone system to the government’s servers. Microsoft helped rebuild the system, moving the government to Teams, SharePoint, OneDrive and Microsoft 365. Manchester’s team recruited the Government of Nunavut to pilot Windows 365. Wells was intrigued, especially by the ability to manage the elastic workforce securely and seamlessly.
           “The impact that I believe we are finding, and the impact that we’re going to find going forward, is being able to access specialists from outside the territory and organizations outside the territory to come in and help us with our projects, being able to get people on staff with us to help us deliver the day-to-day expertise that we need to run the government,” he said.
           “Being able to improve healthcare, being able to improve education, economic development is going to improve the quality of life in the communities.”`,
];

const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));

const actions: AnalyzeBatchAction[] = [
  {
    kind: "AbstractiveSummarization",
    sentenceCount: 2,
  },
];
const poller = await client.beginAnalyzeBatch(actions, documents, "en");

poller.onProgress(() => {
  console.log(
    `Last time the operation was updated was on: ${poller.getOperationState().modifiedOn}`,
  );
});
console.log(`The operation was created on ${poller.getOperationState().createdOn}`);
console.log(`The operation results will expire on ${poller.getOperationState().expiresOn}`);

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
```

### Custom Entity Recognition

Recognize and categorize entities in text as entities using custom entity detection models built using [Azure Language Studio][lang_studio].

```ts snippet:Sample_CustomEntityRecognition
import { TextAnalysisClient } from "@azure/ai-language-text";
import { AzureKeyCredential } from "@azure/core-auth";

const documents = [
  "We love this trail and make the trip every year. The views are breathtaking and well worth the hike! Yesterday was foggy though, so we missed the spectacular views. We tried again today and it was amazing. Everyone in my family liked the trail although it was too challenging for the less athletic among us.",
  "Last week we stayed at Hotel Foo to celebrate our anniversary. The staff knew about our anniversary so they helped me organize a little surprise for my partner. The room was clean and with the decoration I requested. It was perfect!",
];

const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));

const actions: AnalyzeBatchAction[] = [
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
```

### Custom Single-label Classification

Classify documents using custom single-label models built using [Azure Language Studio][lang_studio].

```ts snippet:Sample_CustomSingleLabelClassification
import { TextAnalysisClient } from "@azure/ai-language-text";
import { AzureKeyCredential } from "@azure/core-auth";

const documents = [
  "The plot begins with a large group of characters where everyone thinks that the two main ones should be together but foolish things keep them apart. Misunderstandings, miscommunication, and confusion cause a series of humorous situations.",
];

const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));

const actions: AnalyzeBatchAction[] = [
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
      `Expected a CustomSingleLabelClassification results but got: ${actionResult.kind}`,
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
```

### Custom Multi-label Classification

Classify documents using custom multi-label models built using [Azure Language Studio][lang_studio].

```ts snippet:Sample_CustomMultiLabelClassification
import { TextAnalysisClient } from "@azure/ai-language-text";
import { AzureKeyCredential } from "@azure/core-auth";

const documents = [
  "The plot begins with a large group of characters where everyone thinks that the two main ones should be together but foolish things keep them apart. Misunderstandings, miscommunication, and confusion cause a series of humorous situations.",
];

const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));

const actions: AnalyzeBatchAction[] = [
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
      `Expected a CustomMultiLabelClassification results but got: ${actionResult.kind}`,
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
```

### Action Batching

Applies multiple actions on each input document in one service request.

```ts snippet:Sample_ActionBatching
import { TextAnalysisClient } from "@azure/ai-language-text";
import { AzureKeyCredential } from "@azure/core-auth";

const documents = [
  "Microsoft was founded by Bill Gates and Paul Allen.",
  "Redmond is a city in King County, Washington, United States, located 15 miles east of Seattle.",
  "I need to take my cat to the veterinarian.",
  "The employee's SSN is 555-55-5555.",
  "We went to Contoso Steakhouse located at midtown NYC last week for a dinner party, and we adore the spot! They provide marvelous food and they have a great menu. The chief cook happens to be the owner (I think his name is John Doe) and he is super nice, coming out of the kitchen and greeted us all. We enjoyed very much dining in the place! The Sirloin steak I ordered was tender and juicy, and the place was impeccably clean. You can even pre-order from their online menu at www.contososteakhouse.com, call 312-555-0176 or send email to order@contososteakhouse.com! The only complaint I have is the food didn't come fast enough. Overall I highly recommend it!",
];

const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));

const actions: AnalyzeBatchAction[] = [
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

poller.onProgress(() => {
  console.log(
    `Number of actions still in progress: ${poller.getOperationState().actionInProgressCount}`,
  );
});

console.log(`The operation was created on ${poller.getOperationState().createdOn}`);

console.log(`The operation results will expire on ${poller.getOperationState().expiresOn}`);

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
```
