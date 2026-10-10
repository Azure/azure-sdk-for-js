// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list by specified resource group
 *
 * @summary list by specified resource group
 * x-ms-original-file: 2026-05-01-preview/SolutionDeployments_ListByResourceGroup_MaximumSet_Gen.json
 */
async function solutionDeploymentsListByResourceGroupMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "45FB0C97-8A30-4DA8-81E4-5DFCBED80DBA";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.solutionDeployments.listByResourceGroup(
    "rgconfigurationmanager",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await solutionDeploymentsListByResourceGroupMaximumSet();
}

main().catch(console.error);
