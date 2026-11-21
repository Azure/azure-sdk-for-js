// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the specified public IP address in a virtual machine scale set.
 *
 * @summary get the specified public IP address in a virtual machine scale set.
 * x-ms-original-file: 2026-03-01/VmssPublicIpGetForvmssNetwork.json
 */
async function getVmssPublicIP(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vmssPublicIPAddresses.getVirtualMachineScaleSetPublicIPAddress(
    "vmss-tester",
    "vmss1",
    "nic1",
    "ip1",
    "pub1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getVmssPublicIP();
}

main().catch(console.error);
