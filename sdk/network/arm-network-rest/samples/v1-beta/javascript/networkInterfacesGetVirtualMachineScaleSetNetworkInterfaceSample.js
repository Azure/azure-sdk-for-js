// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Get the specified network interface in a virtual machine scale set.
 *
 * @summary Get the specified network interface in a virtual machine scale set.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VmssNetworkInterfaceGet.json
 */
async function getVirtualMachineScaleSetNetworkInterface() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualMachineScaleSetName = "vmss1";
  const virtualmachineIndex = "1";
  const networkInterfaceName = "nic1";
  const options = {
    queryParameters: { "api-version": "2018-10-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Compute/virtualMachineScaleSets/{virtualMachineScaleSetName}/virtualMachines/{virtualmachineIndex}/networkInterfaces/{networkInterfaceName}",
      subscriptionId,
      resourceGroupName,
      virtualMachineScaleSetName,
      virtualmachineIndex,
      networkInterfaceName
    )
    .get(options);
  console.log(result);
}

getVirtualMachineScaleSetNetworkInterface().catch(console.error);
