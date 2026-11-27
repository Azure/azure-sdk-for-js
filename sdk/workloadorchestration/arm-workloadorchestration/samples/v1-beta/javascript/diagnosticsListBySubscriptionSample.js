// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists Diagnostics resources within an Azure subscription.
 *
 * @summary lists Diagnostics resources within an Azure subscription.
 * x-ms-original-file: 2026-05-01-preview/Diagnostics_ListBySubscription_MaximumSet_Gen.json
 */
async function diagnosticsListBySubscriptionMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diagnostics.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists Diagnostics resources within an Azure subscription.
 *
 * @summary lists Diagnostics resources within an Azure subscription.
 * x-ms-original-file: 2026-05-01-preview/Diagnostics_ListBySubscription_MinimumSet_Gen.json
 */
async function diagnosticsListBySubscriptionMaximumSetGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diagnostics.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await diagnosticsListBySubscriptionMaximumSetGeneratedByMaximumSetRule();
  await diagnosticsListBySubscriptionMaximumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
