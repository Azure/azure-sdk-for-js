// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample uses the PII-recognition endpoint to detect sensitive
 * personally identifiable information in documents (such as social security
 * numbers, addresses, and more). The API returns information about the
 * location of the sensitive information in the text, which we use to perform
 * redaction of the PII text.
 *
 * @summary detects personally-identifiable information
 */

const {
  TextAnalysisClient,
  AzureKeyCredential,
  KnownPiiEntityDomain,
  KnownPiiEntityCategory,
} = require("@azure/ai-text-analytics");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running recognizePii sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["ENDPOINT"] || "<cognitive language service endpoint>";
  const apiKey = process.env["LANGUAGE_API_KEY"] || "<api key>";

  const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey));

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
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
