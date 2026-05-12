// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitoraccounts");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists metrics containers for a monitoring account.
 *
 * @summary lists metrics containers for a monitoring account.
 * x-ms-original-file: 2025-10-03/MetricsContainers_ListByAzureMonitorWorkspace_MaximumSet_Gen.json
 */
async function metricsContainersListByAzureMonitorWorkspaceMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.metricsContainers.listByAzureMonitorWorkspace(
    "rgazuremonitorworkspace",
    "myAzureMonitorWorkspace",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await metricsContainersListByAzureMonitorWorkspaceMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
