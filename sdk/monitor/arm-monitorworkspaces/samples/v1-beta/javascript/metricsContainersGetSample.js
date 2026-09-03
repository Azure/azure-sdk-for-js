// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitorworkspaces");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets metrics container settings for a monitoring account.
 *
 * @summary gets metrics container settings for a monitoring account.
 * x-ms-original-file: 2025-10-03/MetricsContainers_Get_MaximumSet_Gen.json
 */
async function metricsContainersGetMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricsContainers.get(
    "rgazuremonitorworkspace",
    "myAzureMonitorWorkspace",
    "default",
  );
  console.log(result);
}

async function main() {
  await metricsContainersGetMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
