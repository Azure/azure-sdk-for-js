// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get the specified network interface ip configuration in a virtual machine scale set.
 *
 * @summary Get the specified network interface ip configuration in a virtual machine scale set.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VmssNetworkInterfaceIpConfigGet.json
 */
async function getVirtualMachineScaleSetNetworkInterface() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualMachineScaleSetName = "vmss1";
  const virtualmachineIndex = "2";
  const networkInterfaceName = "nic1";
  const ipConfigurationName = "ip1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkInterfaces.getVirtualMachineScaleSetIpConfiguration(
    resourceGroupName,
    virtualMachineScaleSetName,
    virtualmachineIndex,
    networkInterfaceName,
    ipConfigurationName,
  );
  console.log(result);
}

async function main() {
  await getVirtualMachineScaleSetNetworkInterface();
}

main().catch(console.error);
