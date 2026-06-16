// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the advanced platform metrics rules associated with the storage account.
 *
 * @summary list the advanced platform metrics rules associated with the storage account.
 * x-ms-original-file: 2026-04-01/AdvancedPlatformMetricsCRUD/AdvancedPlatformMetricsRules_List.json
 */
async function advancedPlatformMetricsRulesListListAdvancedPlatformMetricsRules() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.advancedPlatformMetrics.list("res6977", "sto2527")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await advancedPlatformMetricsRulesListListAdvancedPlatformMetricsRules();
}

main().catch(console.error);
