// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Instance Resources
 *
 * @summary list Instance Resources
 * x-ms-original-file: 2026-05-01-preview/Instances_ListBySolution_MaximumSet_Gen.json
 */
async function instancesListBySolutionMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.instances.listBySolution(
    "rgconfigurationmanager",
    "testname",
    "testname",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await instancesListBySolutionMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
