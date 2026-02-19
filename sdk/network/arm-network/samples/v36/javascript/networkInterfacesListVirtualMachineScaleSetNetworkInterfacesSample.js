// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets all network interfaces in a virtual machine scale set.
 *
 * @summary Gets all network interfaces in a virtual machine scale set.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VmssNetworkInterfaceList.json
 */
async function listVirtualMachineScaleSetNetworkInterfaces() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualMachineScaleSetName = "vmss1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkInterfaces.listVirtualMachineScaleSetNetworkInterfaces(
    resourceGroupName,
    virtualMachineScaleSetName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listVirtualMachineScaleSetNetworkInterfaces();
}

main().catch(console.error);
