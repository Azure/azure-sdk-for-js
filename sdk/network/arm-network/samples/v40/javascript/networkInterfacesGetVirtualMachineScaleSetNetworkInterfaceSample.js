// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the specified network interface in a virtual machine scale set.
 *
 * @summary get the specified network interface in a virtual machine scale set.
 * x-ms-original-file: 2026-05-01/VmssNetworkInterfaceGetForvmssNetwork.json
 */
async function getVirtualMachineScaleSetNetworkInterface() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkInterfaces.getVirtualMachineScaleSetNetworkInterface(
    "rg1",
    "vmss1",
    "1",
    "nic1",
  );
  console.log(result);
}

async function main() {
  await getVirtualMachineScaleSetNetworkInterface();
}

main().catch(console.error);
