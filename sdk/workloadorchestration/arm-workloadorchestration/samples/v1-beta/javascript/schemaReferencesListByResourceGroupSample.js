// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list by specified resource group
 *
 * @summary list by specified resource group
 * x-ms-original-file: 2025-06-01/SchemaReferences_ListByResourceGroup_MaximumSet_Gen.json
 */
async function schemaReferencesListByResourceGroupMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.schemaReferences.listByResourceGroup("jdvtghygpz")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await schemaReferencesListByResourceGroupMaximumSet();
}

main().catch(console.error);
