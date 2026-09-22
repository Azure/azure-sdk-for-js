// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a storage insight instance.
 *
 * @summary gets a storage insight instance.
 * x-ms-original-file: 2025-07-01/StorageInsightsGet.json
 */
async function storageInsightsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.storageInsightConfigs.get(
    "OIAutoRest5123",
    "aztest5048",
    "AzTestSI1110",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storageInsightsGet();
}

main().catch(console.error);
