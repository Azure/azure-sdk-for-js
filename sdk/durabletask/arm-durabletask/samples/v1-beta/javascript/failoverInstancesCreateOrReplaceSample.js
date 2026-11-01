// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DurableTaskClient } = require("@azure/arm-durabletask");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or Update a Failover Instance
 *
 * @summary create or Update a Failover Instance
 * x-ms-original-file: 2026-07-01-preview/FailoverInstances_CreateOrReplace_MaximumSet_Gen.json
 */
async function failoverInstancesCreateOrReplaceMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "194D3C1E-462F-4738-9025-092A628C06EB";
  const client = new DurableTaskClient(credential, subscriptionId);
  const result = await client.failoverInstances.createOrReplace("rgdurabletask", "testscheduler", {
    properties: {
      partnerSchedulerResourceId:
        "/subscriptions/194D3C1E-462F-4738-9025-092A628C06EB/resourceGroups/rgdurabletask-secondary/providers/Microsoft.DurableTask/schedulers/testscheduler-secondary",
    },
  });
  console.log(result);
}

async function main() {
  await failoverInstancesCreateOrReplaceMaximumSet();
}

main().catch(console.error);
