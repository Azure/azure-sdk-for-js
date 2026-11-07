// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the specified network interface ip configuration in a virtual machine scale set.
 *
 * @summary get the specified network interface ip configuration in a virtual machine scale set.
 * x-ms-original-file: 2026-03-01/VmssNetworkInterfaceIpConfigGetForvmssNetwork.json
 */
async function getVirtualMachineScaleSetNetworkInterface(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkInterfaces.getVirtualMachineScaleSetIpConfiguration(
    "rg1",
    "vmss1",
    "2",
    "nic1",
    "ip1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getVirtualMachineScaleSetNetworkInterface();
}

main().catch(console.error);
