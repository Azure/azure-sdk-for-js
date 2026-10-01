// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a storageInsightsConfigs resource
 *
 * @summary deletes a storageInsightsConfigs resource
 * x-ms-original-file: 2025-07-01/StorageInsightsDelete.json
 */
async function storageInsightsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  await client.storageInsightConfigs.delete("OIAutoRest5123", "aztest5048", "AzTestSI1110");
}

async function main(): Promise<void> {
  await storageInsightsDelete();
}

main().catch(console.error);
