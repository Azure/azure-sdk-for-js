// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DurableTaskClient } = require("@azure/arm-durabletask");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Failover Instance
 *
 * @summary get a Failover Instance
 * x-ms-original-file: 2026-07-01-preview/FailoverInstances_Get_MaximumSet_Gen.json
 */
async function failoverInstancesGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "194D3C1E-462F-4738-9025-092A628C06EB";
  const client = new DurableTaskClient(credential, subscriptionId);
  const result = await client.failoverInstances.get("rgdurabletask", "testscheduler");
  console.log(result);
}

async function main() {
  await failoverInstancesGetMaximumSet();
}

main().catch(console.error);
