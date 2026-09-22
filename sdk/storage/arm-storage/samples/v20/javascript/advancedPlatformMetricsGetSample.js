// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the advanced platform metrics rule for the storage account by rule type.
 *
 * @summary get the advanced platform metrics rule for the storage account by rule type.
 * x-ms-original-file: 2026-04-01/AdvancedPlatformMetricsCRUD/AdvancedPlatformMetricsRules_Get.json
 */
async function advancedPlatformMetricsRulesGetGetAdvancedPlatformMetricsRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.advancedPlatformMetrics.get(
    "res6977",
    "sto2527",
    "ContainerLevelCapacityMetrics",
  );
  console.log(result);
}

async function main() {
  await advancedPlatformMetricsRulesGetGetAdvancedPlatformMetricsRule();
}

main().catch(console.error);
