// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * detects entities that have links to more information on the web
 */

import {
  TextAnalyticsClient,
  CognitiveServicesCredential,
  RecognizeLinkedEntitiesResult,
  RecognizeLinkedEntitiesErrorResult,
  RecognizeLinkedEntitiesSuccessResult
} from "@azure/ai-text-analytics";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log(`Running extractLinkEntities sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["ENDPOINT"] || "<cognitive services endpoint>";
  const subscriptionKey = process.env["SUBSCRIPTION_KEY"] || "<subscription key>";

  const client = new TextAnalyticsClient(
    endpoint,
    new CognitiveServicesCredential(subscriptionKey)
  );

  const [result] = await client.recognizeLinkedEntities(["I love living in Seattle."]);

  if (isSuccess(result)) {
    for (const entity of result.entities) {
      console.log(
        `Found entity ${entity.name}; link ${entity.url}; datasource: ${entity.dataSource}`
      );
    }
  }
}

function isSuccess(
  result: RecognizeLinkedEntitiesResult
): result is RecognizeLinkedEntitiesSuccessResult {
  return !(result as RecognizeLinkedEntitiesErrorResult).error;
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

