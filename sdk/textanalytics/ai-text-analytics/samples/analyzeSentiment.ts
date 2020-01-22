// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// NOTE: replace with import { TextAnalyticsClient } from "@azure/ai-text-analytics"
// in a standalone project
import {
  TextAnalyticsClient,
  SubscriptionKeyCredential,
  AnalyzeSentimentResult,
  AnalyzeSentimentSuccessResult,
  AnalyzeSentimentErrorResult
} from "../src";

export async function run() {
  console.log(`Running analyzeSentiment sample`);

  // You will need to set these environment variables
  const endPoint = process.env["AZ_CONFIG_ENDPOINT"]!;
  const subscriptionKey = process.env["AZ_CONFIG_SUBSCRIPTION_KEY"]!;
  const client = new TextAnalyticsClient(endPoint, new SubscriptionKeyCredential(subscriptionKey));

  const [result] = await client.analyzeSentiment(["I love living in Seattle!"]);

  if (isSuccess(result)) {
    console.log(`Sentiment of statement is ${result.sentiment}`);
  }
}

function isSuccess(result: AnalyzeSentimentResult): result is AnalyzeSentimentSuccessResult {
  return !(result as AnalyzeSentimentErrorResult).error;
}

// If you want to run this sample from a console
// uncomment these lines so run() will get called
// run().catch((err) => {
//   console.log(`ERROR: ${err}`);
// });
