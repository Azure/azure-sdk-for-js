// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the hybrid machines in the specified resource group. Use the nextLink property in the response to get the next page of hybrid machines.
 *
 * @summary lists all the hybrid machines in the specified resource group. Use the nextLink property in the response to get the next page of hybrid machines.
 * x-ms-original-file: 2025-09-16-preview/machine/Machines_ListByResourceGroup.json
 */
async function listMachinesByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.machines.listByResourceGroup("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listMachinesByResourceGroup();
}

main().catch(console.error);
