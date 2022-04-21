// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * In this sample, we use the language detection endpoint to determine the
 * written language of several documents written in different languages. The
 * endpoint provides a primary language as well as a score representing the
 * service's confidence in the correctness of its assessment.
 *
 * @summary detects the language of a piece of text
 * @azsdk-weight 100
 */

import { TextAnalysisClient, AzureKeyCredential } from "@azure/ai-text-analytics";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<cognitive language service endpoint>";
const apiKey = process.env["LANGUAGE_API_KEY"] || "<api key>";

const documents = [
  "This document is written in English.",
  "Este es un document escrito en Español.",
  "这是一个用中文写的文件",
  "Dies ist ein Dokument in deutsche Sprache.",
  "Detta är ett dokument skrivet på engelska.",
];

export async function main() {
  console.log("== Detect Language Sample ==");

  const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey));

  const result = await client.analyze("LanguageDetection", documents, "us");

  for (const doc of result) {
    if (!doc.error) {
      console.log(
        `Primary language: ${doc.primaryLanguage.name} (iso6391 name: ${doc.primaryLanguage.iso6391Name})`
      );
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
