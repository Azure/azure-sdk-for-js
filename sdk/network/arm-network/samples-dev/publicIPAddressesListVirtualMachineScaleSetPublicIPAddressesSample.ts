// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about all public IP addresses on a virtual machine scale set level.
 *
 * @summary gets information about all public IP addresses on a virtual machine scale set level.
 * x-ms-original-file: 2026-03-01/VmssPublicIpListAllForvmssNetwork.json
 */
async function listVmssPublicIP(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.publicIPAddresses.listVirtualMachineScaleSetPublicIPAddresses(
    "vmss-tester",
    "vmss1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listVmssPublicIP();
}

main().catch(console.error);
