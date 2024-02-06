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
 * @azsdk-weight 100
 */

import { TextAnalyticsClient, AzureKeyCredential, PiiEntityDomain } from "@azure/ai-text-analytics";
import { assert } from "console";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log(`Running recognizePii sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["TEXT_ANALYTICS_API_KEY"] || "<api key>";

  const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));

  const textOnePii = "My phone number is 555-5555";
  const textNoPHI = "His EU passport number is X65097105";
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

  console.log(`There are no PHI entities in this text: "${textNoPHI}"`);
  const [resultWithPHI] = await client.recognizePiiEntities([textNoPHI], "en", {
    domainFilter: PiiEntityDomain.PROTECTED_HEALTH_INFORMATION,
  });
  if (!resultWithPHI.error) {
    console.log(`Also there is nothing to redact: "${resultWithPHI.redactedText}"`);
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
    categoriesFilter: ["USSocialSecurityNumber"],
  });
  if (!resultWithSSNPII.error) {
    console.log(
      `You can choose to get SSN entities only, or any other PII category or a combination of them. For example, in this text: "${textMultiplePIIs}", this is the SSN number:`
    );
    for (const entity of resultWithSSNPII.entities) {
      console.log(`\t- "${entity.text}"`);
      assert(entity.category === "USSocialSecurityNumber");
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
