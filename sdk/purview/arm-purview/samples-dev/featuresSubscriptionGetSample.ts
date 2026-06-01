// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PurviewManagementClient } from "@azure/arm-purview";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets details from a list of feature names.
 *
 * @summary gets details from a list of feature names.
 * x-ms-original-file: 2024-04-01-preview/Features_SubscriptionGet.json
 */
async function featuresSubscriptionGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-12345678abc";
  const client = new PurviewManagementClient(credential, subscriptionId);
  const result = await client.features.subscriptionGet("eastus", {
    features: ["Feature1", "Feature2", "FeatureThatDoesntExist"],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await featuresSubscriptionGet();
}

main().catch(console.error);
