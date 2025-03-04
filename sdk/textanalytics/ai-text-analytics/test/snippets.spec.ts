// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AnalyzeHealthcareEntitiesSuccessResult,
  AnalyzeSentimentSuccessResult,
  AzureKeyCredential,
  DetectLanguageSuccessResult,
  ExtractKeyPhrasesActionSuccessResult,
  ExtractKeyPhrasesSuccessResult,
  RecognizeCategorizedEntitiesActionSuccessResult,
  RecognizeCategorizedEntitiesSuccessResult,
  RecognizeLinkedEntitiesSuccessResult,
  RecognizePiiEntitiesActionSuccessResult,
  RecognizePiiEntitiesSuccessResult,
  TextAnalyticsClient,
} from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_KeyCredential", async () => {
    const client = new TextAnalyticsClient("<endpoint>", new AzureKeyCredential("<API key>"));
  });

  it("ReadmeSampleCreateClient_AADCredential", async () => {
    const client = new TextAnalyticsClient("<endpoint>", new DefaultAzureCredential());
  });

  it("ReadmeSampleInput", async () => {
    const documents = [
      "I hated the movie. It was so slow!",
      "The movie made it into my top ten favorites.",
      "What a great movie!",
    ];
  });

  it("ReadmeSampleInputWithMetadata", async () => {
    const textDocumentInputs = [
      { id: "1", language: "en", text: "I hated the movie. It was so slow!" },
      { id: "2", language: "en", text: "The movie made it into my top ten favorites." },
      { id: "3", language: "en", text: "What a great movie!" },
    ];
  });

  it("ReadmeSampleFilterErrors", async () => {
    const client = new TextAnalyticsClient("<endpoint>", new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const documents = [
      "I hated the movie. It was so slow!",
      "The movie made it into my top ten favorites.",
      "What a great movie!",
    ];
    // @ts-preserve-whitespace
    const results = await client.analyzeSentiment(documents);
    const onlySuccessful = results.filter((result) => !result.error);
  });

  it("ReadmeSampleTypeScriptStrictNullChecks", async () => {
    const client = new TextAnalyticsClient("<endpoint>", new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const [result] = await client.analyzeSentiment(["Hello world!"]);
    if (result.error) {
      // In this if block, TypeScript will be sure that the type of `result` is
      // `TextAnalyticsError` if compilerOptions.strictNullChecks is enabled in
      // the tsconfig.json
      // @ts-preserve-whitespace
      console.log(result.error);
    }
  });

  it("ReadmeSampleTypeScriptCast", async () => {
    const client = new TextAnalyticsClient("<endpoint>", new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const [result] = await client.detectLanguage(["Hello world!"]);
    // @ts-preserve-whitespace
    if (result.error === undefined) {
      const { primaryLanguage } = result;
    }
  });

  it("ReadmeSampleAnalyzeSentiment", async () => {
    const client = new TextAnalyticsClient("<endpoint>", new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const documents = [
      "I did not like the restaurant. The food was too spicy.",
      "The restaurant was decorated beautifully. The atmosphere was unlike any other restaurant I've been to.",
      "The food was yummy. :)",
    ];
    const results = await client.analyzeSentiment(documents);
    // @ts-preserve-whitespace
    for (const result of results) {
      if (!result.error) {
        const { id, sentiment, confidenceScores } = result;
        console.log(`Document ${id} has sentiment ${sentiment}`);
        console.log(`Positive confidence score: ${confidenceScores.positive}`);
        console.log(`Neutral confidence score: ${confidenceScores.neutral}`);
        console.log(`Negative confidence score: ${confidenceScores.negative}`);
      } else {
        console.error(`Document ${result.id} has an error: ${result.error}`);
      }
    }
  });

  it("ReadmeSampleRecognizeEntities", async () => {
    const client = new TextAnalyticsClient("<endpoint>", new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const documents = [
      "Microsoft was founded by Bill Gates and Paul Allen.",
      "Redmond is a city in King County, Washington, United States, located 15 miles east of Seattle.",
      "Jeff bought three dozen eggs because there was a 50% discount.",
    ];
    const results = await client.recognizeEntities(documents, "en");
    // @ts-preserve-whitespace
    for (const result of results) {
      if (!result.error) {
        const { id, entities } = result;
        console.log(` -- Recognized entities for input ${id}--`);
        for (const { text, category, confidenceScore } of entities) {
          console.log(`${text}: ${category} (Score: ${confidenceScore})`);
        }
      } else {
        console.error(`Document ${result.id} has an error: ${result.error}`);
      }
    }
  });

  it("ReadmeSampleRecognizePiiEntities", async () => {
    const client = new TextAnalyticsClient("<endpoint>", new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const documents = [
      "The employee's SSN is 555-55-5555.",
      "The employee's phone number is (555) 555-5555.",
    ];
    const results = await client.recognizePiiEntities(documents, "en");
    // @ts-preserve-whitespace
    for (const result of results) {
      if (!result.error) {
        const { id, entities } = result;
        console.log(` -- Recognized PII entities for input ${id} --`);
        for (const { text, category, confidenceScore } of entities) {
          console.log(`${text}: ${category} (Score: ${confidenceScore})`);
        }
      } else {
        console.error(`Document ${result.id} has an error: ${result.error}`);
      }
    }
  });

  it("ReadmeSampleRecognizeLinkedEntities", async () => {
    const client = new TextAnalyticsClient("<endpoint>", new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const documents = [
      "Microsoft was founded by Bill Gates and Paul Allen.",
      "Easter Island, a Chilean territory, is a remote volcanic island in Polynesia.",
      "I use Azure Functions to develop my product.",
    ];
    const results = await client.recognizeLinkedEntities(documents, "en");
    // @ts-preserve-whitespace
    for (const result of results) {
      if (!result.error) {
        const { id, entities } = result;
        console.log(` -- Recognized linked entities for input ${id} --`);
        for (const { name, url, dataSource, matches } of entities) {
          console.log(`${name} (URL: ${url}, Source: ${dataSource})`);
          for (const { text, confidenceScore } of matches) {
            console.log(`  Occurrence:"${text}" (Score: ${confidenceScore})`);
          }
        }
      } else {
        console.error(`Document ${result.id} has an error: ${result.error}`);
      }
    }
  });

  it("ReadmeSampleExtractKeyPhrases", async () => {
    const client = new TextAnalyticsClient("<endpoint>", new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const documents = [
      "Redmond is a city in King County, Washington, United States, located 15 miles east of Seattle.",
      "I need to take my cat to the veterinarian.",
      "I will travel to South America in the summer.",
    ];
    const results = await client.extractKeyPhrases(documents, "en");
    // @ts-preserve-whitespace
    for (const result of results) {
      if (!result.error) {
        const { id, keyPhrases } = result;
        console.log(` -- Extracted key phrases for input ${id} --`);
        for (const phrase of keyPhrases) {
          console.log(`"${phrase}"`);
        }
      } else {
        console.error(`Document ${result.id} has an error: ${result.error}`);
      }
    }
  });

  it("ReadmeSampleDetectLanguage", async () => {
    const client = new TextAnalyticsClient("<endpoint>", new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const documents = [
      "This is written in English.",
      "Il documento scritto in italiano.",
      "Dies ist in deutscher Sprache verfasst.",
    ];
    const results = await client.detectLanguage(documents, "none");
    // @ts-preserve-whitespace
    for (const result of results) {
      if (!result.error) {
        const { id, primaryLanguage } = result;
        const { name, iso6391Name, confidenceScore } = primaryLanguage;
        console.log(
          `Input #${id} identified as ${name} (ISO6391: ${iso6391Name}, Score: ${confidenceScore})`,
        );
      } else {
        console.error(`Document ${result.id} has an error: ${result.error}`);
      }
    }
  });

  it("ReadmeSampleAnalyzeHealthcareEntities", async () => {
    const client = new TextAnalyticsClient("<endpoint>", new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const documents = [
      "Prescribed 100mg ibuprofen, taken twice daily.",
      "Patient does not suffer from high blood pressure.",
    ];
    const poller = await client.beginAnalyzeHealthcareEntities(documents);
    const results = await poller.pollUntilDone();
    // @ts-preserve-whitespace
    for await (const result of results) {
      console.log(`- Document ${result.id}`);
      if (!result.error) {
        const { entities } = result;
        console.log("\tRecognized Entities:");
        for (const { text, category } of entities) {
          console.log(`\t- Entity ${text} of type ${category}`);
        }
      } else {
        console.error(`Document ${result.id} has an error: ${result.error}`);
      }
    }
  });

  it("ReadmeSampleAnalyzeActions", async () => {
    const client = new TextAnalyticsClient("<endpoint>", new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const documents = [
      "Microsoft was founded by Bill Gates and Paul Allen.",
      "The employee's SSN is 555-55-5555.",
      "Easter Island, a Chilean territory, is a remote volcanic island in Polynesia.",
      "I use Azure Functions to develop my product.",
    ];
    const actions = {
      recognizeEntitiesActions: [{ modelVersion: "latest" }],
      recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
      extractKeyPhrasesActions: [{ modelVersion: "latest" }],
    };
    const poller = await client.beginAnalyzeActions(documents, actions);
    const resultPages = await poller.pollUntilDone();
    for await (const page of resultPages) {
      // @ts-preserve-whitespace
      const keyPhrasesAction = page.extractKeyPhrasesResults[0];
      if (!keyPhrasesAction.error) {
        const { results } = keyPhrasesAction;
        for (const doc of results) {
          console.log(`- Document ${doc.id}`);
          if (!doc.error) {
            const { keyPhrases } = doc;
            console.log("\tKey phrases:");
            for (const phrase of keyPhrases) {
              console.log(`\t- ${phrase}`);
            }
          } else {
            console.error(`\tError: ${doc.error}`);
          }
        }
      }
      // @ts-preserve-whitespace
      const entitiesAction = page.recognizeEntitiesResults[0];
      if (!entitiesAction.error) {
        const { results } = entitiesAction;
        for (const doc of results) {
          console.log(`- Document ${doc.id}`);
          if (!doc.error) {
            const { entities } = doc;
            console.log("\tEntities:");
            for (const { text, category } of entities) {
              console.log(`\t- Entity ${text} of type ${category}`);
            }
          } else {
            console.error(`\tError: ${doc.error}`);
          }
        }
      }
      // @ts-preserve-whitespace
      const piiEntitiesAction = page.recognizePiiEntitiesResults[0];
      if (!piiEntitiesAction.error) {
        const { results } = piiEntitiesAction;
        for (const doc of results) {
          console.log(`- Document ${doc.id}`);
          if (!doc.error) {
            const { entities } = doc;
            console.log("\tPii Entities:");
            for (const { text, category } of entities) {
              console.log(`\t- Entity ${text} of type ${category}`);
            }
          } else {
            console.error(`\tError: ${doc.error}`);
          }
        }
      }
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
