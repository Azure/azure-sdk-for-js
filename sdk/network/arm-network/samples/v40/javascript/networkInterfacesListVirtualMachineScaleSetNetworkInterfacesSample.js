// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all network interfaces in a virtual machine scale set.
 *
 * @summary gets all network interfaces in a virtual machine scale set.
 * x-ms-original-file: 2026-05-01/VmssNetworkInterfaceListForvmssNetwork.json
 */
async function listVirtualMachineScaleSetNetworkInterfaces() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkInterfaces.listVirtualMachineScaleSetNetworkInterfaces(
    "rg1",
    "vmss1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listVirtualMachineScaleSetNetworkInterfaces();
}

main().catch(console.error);
