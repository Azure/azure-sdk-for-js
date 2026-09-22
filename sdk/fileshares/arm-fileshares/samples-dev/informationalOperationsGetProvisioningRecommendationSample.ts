// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileSharesClient } from "@azure/arm-fileshares";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get file shares provisioning parameters recommendation.
 *
 * @summary get file shares provisioning parameters recommendation.
 * x-ms-original-file: 2026-06-01/FileShare_GetProvisioningRecommendation_MaximumSet_Gen.json
 */
async function fileShareGetProvisioningRecommendationMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  const result = await client.informationalOperations.getProvisioningRecommendation("westus", {
    properties: { provisionedStorageGiB: 7 },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get file shares provisioning parameters recommendation.
 *
 * @summary get file shares provisioning parameters recommendation.
 * x-ms-original-file: 2026-06-01/FileShare_GetProvisioningRecommendation_MinimumSet_Gen.json
 */
async function fileShareGetProvisioningRecommendationMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  const result = await client.informationalOperations.getProvisioningRecommendation("westus", {
    properties: { provisionedStorageGiB: 7 },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await fileShareGetProvisioningRecommendationMaximumSet();
  await fileShareGetProvisioningRecommendationMinimumSet();
}

main().catch(console.error);
