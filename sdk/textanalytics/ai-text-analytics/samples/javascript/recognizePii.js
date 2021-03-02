// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * detects personally-identifiable information
 */

const {
  TextAnalyticsClient,
  AzureKeyCredential,
  PiiEntityDomainType
} = require("@azure/ai-text-analytics");
const { assert } = require("console");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running recognizePii sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["TEXT_ANALYTICS_API_KEY"] || "<api key>";

  const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));

  const textOnePii = "My phone number is 555-5555";
  const textNoPHI =
    "FIFA is a non-profit organization which describes itself as an international governing body of association football.";
  const textMultiplePIIs = "Patient name is Joe and SSN is 859-98-0987";

  const [result] = await client.recognizePiiEntities([textOnePii]);

  if (!result.error) {
    console.log(
      `The redacted text is "${result.redactedText}" and found the following PII entities`
    );
    for (const entity of result.entities) {
      console.log(`\t- "${entity.text}" of type ${entity.category}`);
    }
  }

  console.log(`There are no PHI entities in this text: ${textNoPHI}`);
  const [resultWithPHI] = await client.recognizePiiEntities([
    { id: "0", text: textNoPHI, language: "en" }
  ]);
  if (!resultWithPHI.error) {
    console.log(`Also there is nothing to redact: ${resultWithPHI.redactedText}`);
    assert(resultWithPHI.entities.length === 0, "did not expect any entities but got some");
  }

  console.log(`But there are other PII entities in that text:`);
  const [resultWithoutPHI] = await client.recognizePiiEntities([textNoPHI]);
  if (!resultWithoutPHI.error) {
    for (const entity of resultWithoutPHI.entities) {
      console.log(`\t- "${entity.text}" of type ${entity.category}`);
    }
  }
  const [resultWithSSNPII] = await client.recognizePiiEntities([textMultiplePIIs], "en", {
    categoriesFilter: ["USSocialSecurityNumber"]
  });
  if (!resultWithSSNPII.error) {
    console.log("The service was asked to return just SSN entities:");
    for (const entity of resultWithSSNPII.entities) {
      console.log(`\t- "${entity.text}"`);
      assert(entity.category === "USSocialSecurityNumber");
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
