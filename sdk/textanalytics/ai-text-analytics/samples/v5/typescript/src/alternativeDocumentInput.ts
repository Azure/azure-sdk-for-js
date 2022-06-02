// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use objects with additional metadata as
 * inputs to the Text Analytics service as an alternative to passing arrays of
 * simple strings in the client methods.
 *
 * @summary uses objects with attached metadata instead of simple strings as
 * inputs for flexibility
 */

import {
  TextAnalyticsClient,
  AzureKeyCredential,
  DetectLanguageInput,
  TextDocumentInput
} from "@azure/ai-text-analytics";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set this environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<cognitive language service endpoint>";
const apiKey = process.env["TEXT_ANALYTICS_API_KEY"] || "<api key>";

/**
 * DetectLanguageInput objects allow for specification of country hints on a
 * document-by-document basis.
 *
 * When using DetectLanguageInput, the `id` field is required and must be unique
 * for each document in a given request.
 */
const detectLanguageInputs: DetectLanguageInput[] = [
  { id: "0", countryHint: "us", text: "I had the best day of my life." },
  { id: "1", countryHint: "us", text: "This was a waste of my time. The speaker put me to sleep." },
  { id: "2", countryHint: "us", text: "No tengo dinero ni nada que dar..." },
  {
    id: "3",
    countryHint: "fr",
    text: "L'hôtel n'était pas très confortable. L'éclairage était trop sombre."
  }
];

/**
 * TextDocumentInput objects are used by all methods except for `detectLanguage`.
 * They allow for specification of input language on a document-by-document basis.
 *
 * Like `DetectLanguageInput`, the `id` field is required and must be unique for
 * each document in the request.
 */
const textDocumentInputs: TextDocumentInput[] = [
  { id: "0", language: "en", text: "I had the best day of my life." },
  { id: "1", language: "en", text: "This was a waste of my time. The speaker put me to sleep." },
  { id: "2", language: "es", text: "No tengo dinero ni nada que dar..." },
  {
    id: "3",
    language: "fr",
    text: "L'hôtel n'était pas très confortable. L'éclairage était trop sombre."
  }
];

export async function main() {
  console.log("== Alternative Document Input Objects Sample ==");

  const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));

  console.log("-- Detect Language --");
  // DetectLanguageInput objects may be used with the detectLanguage method
  for (const result of await client.detectLanguage(detectLanguageInputs)) {
    if (!result.error) {
      const { id, primaryLanguage } = result;
      console.log(`Document ${id} is in ${primaryLanguage.name}.`);
    }
  }

  console.log("-- Extract Key Phrases --");
  // TextDocumentInput objects may be used with any other method
  // (for example, extractKeyPhrases)
  for (const result of await client.extractKeyPhrases(textDocumentInputs)) {
    if (!result.error) {
      const { id, keyPhrases } = result;
      console.log(`Document ${id} has ${keyPhrases.length} key phrases:`);
      for (const phrase of keyPhrases) {
        console.log(`- ${phrase}`);
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
