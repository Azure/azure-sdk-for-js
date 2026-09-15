// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list InstanceHistory Resources
 *
 * @summary list InstanceHistory Resources
 * x-ms-original-file: 2026-05-01-preview/InstanceHistories_ListByInstance_MaximumSet_Gen.json
 */
async function instanceHistoriesListByInstanceMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.instanceHistories.listByInstance(
    "rgconfigurationmanager",
    "testname",
    "testname",
    "testname",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await instanceHistoriesListByInstanceMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
