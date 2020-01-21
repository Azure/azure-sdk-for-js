// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// NOTE: replace with import { TextAnalyticsClient } from "@azure/ai-text-analytics"
// in a standalone project
import { TextAnalyticsClient, CognitiveServicesCredential } from "../src";

export async function run() {
  console.log(`Running extractKeyPhrases sample`);

  // You will need to set these environment variables
  const endPoint = process.env["AZ_CONFIG_ENDPOINT"]!;
  const subscriptionKey = process.env["AZ_CONFIG_SUBSCRIPTION_KEY"]!;
  const client = new TextAnalyticsClient(
    endPoint,
    new CognitiveServicesCredential(subscriptionKey)
  );

  const [result] = await client.extractKeyPhrases([
    "I love living in Seattle! Seattle is always sunny."
  ]);

  if (result.isSuccess) {
    for (const phrase of result.keyPhrases) {
      console.log(`Key phrase: ${phrase}`);
    }
  }
}

// If you want to run this sample from a console
// uncomment these lines so run() will get called
// run().catch((err) => {
//   console.log(`ERROR: ${err}`);
// });
