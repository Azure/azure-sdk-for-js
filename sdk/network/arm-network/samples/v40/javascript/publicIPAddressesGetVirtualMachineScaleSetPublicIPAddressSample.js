// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the specified public IP address in a virtual machine scale set.
 *
 * @summary get the specified public IP address in a virtual machine scale set.
 * x-ms-original-file: 2026-05-01/VmssPublicIpGetForvmssNetwork.json
 */
async function getVmssPublicIP() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPAddresses.getVirtualMachineScaleSetPublicIPAddress(
    "vmss-tester",
    "vmss1",
    "1",
    "nic1",
    "ip1",
    "pub1",
  );
  console.log(result);
}

async function main() {
  await getVmssPublicIP();
}

main().catch(console.error);
