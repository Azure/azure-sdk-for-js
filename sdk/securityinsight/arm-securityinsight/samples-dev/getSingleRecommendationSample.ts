// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a recommendation by its id.
 *
 * @summary gets a recommendation by its id.
 * x-ms-original-file: 2025-07-01-preview/recommendations/GetRecommendation.json
 */
async function getARecommendation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.get.singleRecommendation(
    "myRg",
    "myWorkspace",
    "6d4b54eb-8684-4aa3-a156-3aa37b8014bc",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getARecommendation();
}

main().catch(console.error);
