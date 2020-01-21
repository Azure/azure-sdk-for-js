// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// NOTE: replace with import { TextAnalyticsClient } from "@azure/ai-text-analytics"
// in a standalone project
import {
  TextAnalyticsClient,
  CognitiveServicesCredential,
  RecognizeLinkedEntitiesResult,
  RecognizeLinkedEntitiesErrorResult,
  RecognizeLinkedEntitiesSuccessResult
} from "../src";

export async function run() {
  console.log(`Running extractLinkEntities sample`);

  // You will need to set these environment variables
  const endPoint = process.env["AZ_CONFIG_ENDPOINT"]!;
  const subscriptionKey = process.env["AZ_CONFIG_SUBSCRIPTION_KEY"]!;
  const client = new TextAnalyticsClient(
    endPoint,
    new CognitiveServicesCredential(subscriptionKey)
  );

  const [result] = await client.recognizeLinkedEntities(["I love living in Seattle."]);

  if (result.isSuccess) {
    for (const entity of result.entities) {
      console.log(
        `Found entity ${entity.name}; link ${entity.url}; datasource: ${entity.dataSource}`
      );
    }
  }
}

// If you want to run this sample from a console
// uncomment these lines so run() will get called
// run().catch((err) => {
//   console.log(`ERROR: ${err}`);
// });
