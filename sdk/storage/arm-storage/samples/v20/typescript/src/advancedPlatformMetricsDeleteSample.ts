// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the advanced platform metrics rule for the storage account by rule type.
 *
 * @summary delete the advanced platform metrics rule for the storage account by rule type.
 * x-ms-original-file: 2026-04-01/AdvancedPlatformMetricsCRUD/AdvancedPlatformMetricsRules_Delete.json
 */
async function advancedPlatformMetricsRulesDeleteDeleteAdvancedPlatformMetricsRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.advancedPlatformMetrics.delete(
    "res6977",
    "sto2527",
    "ContainerLevelCapacityMetrics",
  );
}

async function main(): Promise<void> {
  await advancedPlatformMetricsRulesDeleteDeleteAdvancedPlatformMetricsRule();
}

main().catch(console.error);
