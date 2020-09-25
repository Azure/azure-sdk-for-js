// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * detects personally-identifiable information
 */

import {
  TextAnalyticsClient,
  AzureKeyCredential,
  PiiEntityDomainType
} from "@azure/ai-text-analytics";
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

  const textWithPhoneNumber = "My phone number is 555-5555";
  console.log(`Let's recognize PII entities in the following text: ${textWithPhoneNumber}`);
  const [result] = await client.recognizePiiEntities([textWithPhoneNumber]);

  if (!result.error) {
    console.log(`The redacted text: ${result.redactedText}`);
    for (const entity of result.entities) {
      console.log(`Found PII entity ${entity.text} of type ${entity.category}`);
    }
  }

  const textNoPHI =
    "FIFA is a non-profit organization which describes itself as an international governing body of association football.";
  console.log(`There are no PHI entities in this text: ${textNoPHI}`);
  const [resultWithPHI] = await client.recognizePiiEntities(
    [{ id: "0", text: textNoPHI, language: "en" }],
    { domainFilter: PiiEntityDomainType.PROTECTED_HEALTH_INFORMATION }
  );
  if (!resultWithPHI.error) {
    console.log(`Also there is nothing to redact: ${resultWithPHI.redactedText}`);
    assert(resultWithPHI.entities.length === 0);
  }

  console.log(`But there are other entities in that text`);
  const [resultWithoutPHI] = await client.recognizePiiEntities([textNoPHI]);
  if (!resultWithoutPHI.error) {
    for (const entity of resultWithoutPHI.entities) {
      console.log(`Found PII entity ${entity.text} of type ${entity.category}`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
