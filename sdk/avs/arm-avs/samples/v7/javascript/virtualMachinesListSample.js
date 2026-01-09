// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list VirtualMachine resources by Cluster
 *
 * @summary list VirtualMachine resources by Cluster
 * x-ms-original-file: 2025-09-01/VirtualMachines_List.json
 */
async function virtualMachinesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachines.list("group1", "cloud1", "cluster1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await virtualMachinesList();
}

main().catch(console.error);
