// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * detects entites in a piece of text and prints them along with the entity type
 */

import {
  TextAnalyticsClient,
  CognitiveServicesCredential,
  RecognizeEntitiesResult,
  RecognizeEntitiesSuccessResult,
  RecognizeEntitiesErrorResult
} from "@azure/ai-text-analytics";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log(`Running recognizeEntities sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICES_ENDPOINT"] || "<cognitive services endpoint>";
  const subscriptionKey = process.env["SUBSCRIPTION_KEY"] || "<subscription key>";

  const client = new TextAnalyticsClient(
    endpoint,
    new CognitiveServicesCredential(subscriptionKey)
  );

  const [result] = await client.recognizeEntities(["I love living in Seattle."]);

  if (isSuccess(result)) {
    for (const entity of result.entities) {
      console.log(`Found entity ${entity.text} of type ${entity.type}`);
    }
  }
}

function isSuccess(result: RecognizeEntitiesResult): result is RecognizeEntitiesSuccessResult {
  return !(result as RecognizeEntitiesErrorResult).error;
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

