// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// NOTE: replace with import { TextAnalyticsClient } from "@azure/cognitiveservices-textanalytics"
// in a standalone project
import {
  TextAnalyticsClient,
  CognitiveServicesCredential,
  RecognizeEntitiesResult,
  RecognizeEntitiesSuccessResult,
  RecognizeEntitiesErrorResult
} from "../src";

export async function run() {
  console.log(`Running recognizePii sample`);

  // You will need to set these environment variables
  const endPoint = process.env["AZ_CONFIG_ENDPOINT"]!;
  const subscriptionKey = process.env["AZ_CONFIG_SUBSCRIPTION_KEY"]!;
  const client = new TextAnalyticsClient(
    endPoint,
    new CognitiveServicesCredential(subscriptionKey)
  );

  const [result] = await client.recognizePiiEntities(["My phone number is 555-5555"]);

  if (isSuccess(result)) {
    for (const entity of result.entities) {
      console.log(`Found PII entity ${entity.text} of type ${entity.type}`);
    }
  }
}

function isSuccess(result: RecognizeEntitiesResult): result is RecognizeEntitiesSuccessResult {
  return !(result as RecognizeEntitiesErrorResult).error;
}

// If you want to run this sample from a console
// uncomment these lines so run() will get called
// run().catch((err) => {
//   console.log(`ERROR: ${err}`);
// });
