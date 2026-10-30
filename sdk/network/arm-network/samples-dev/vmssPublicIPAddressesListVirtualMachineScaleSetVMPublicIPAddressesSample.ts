// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about all public IP addresses in a virtual machine IP configuration in a virtual machine scale set.
 *
 * @summary gets information about all public IP addresses in a virtual machine IP configuration in a virtual machine scale set.
 * x-ms-original-file: 2026-03-01/VmssVmPublicIpListForvmssNetwork.json
 */
async function listVmssvmPublicIP(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vmssPublicIPAddresses.listVirtualMachineScaleSetVMPublicIPAddresses(
    "vmss-tester",
    "vmss1",
    "nic1",
    "ip1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listVmssvmPublicIP();
}

main().catch(console.error);
