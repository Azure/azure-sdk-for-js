// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list by specified resource group
 *
 * @summary list by specified resource group
 * x-ms-original-file: 2026-05-01-preview/Schemas_ListByResourceGroup_MaximumSet_Gen.json
 */
async function schemasListByResourceGroupMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.schemas.listByResourceGroup("rgconfigurationmanager")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list by specified resource group
 *
 * @summary list by specified resource group
 * x-ms-original-file: 2026-05-01-preview/Schemas_ListByResourceGroup_MinimumSet_Gen.json
 */
async function schemasListByResourceGroupMaximumSetGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.schemas.listByResourceGroup("rgconfigurationmanager")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await schemasListByResourceGroupMaximumSetGeneratedByMaximumSetRule();
  await schemasListByResourceGroupMaximumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
