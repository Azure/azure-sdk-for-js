// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DurableTaskClient } = require("@azure/arm-durabletask");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Retention Policies
 *
 * @summary list Retention Policies
 * x-ms-original-file: 2025-04-01-preview/RetentionPolicies_ListByScheduler_MaximumSet_Gen.json
 */
async function retentionPoliciesListBySchedulerMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "194D3C1E-462F-4738-9025-092A628C06EB";
  const client = new DurableTaskClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.retentionPolicies.listByScheduler(
    "rgdurabletask",
    "myscheduler",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await retentionPoliciesListBySchedulerMaximumSet();
}

main().catch(console.error);
