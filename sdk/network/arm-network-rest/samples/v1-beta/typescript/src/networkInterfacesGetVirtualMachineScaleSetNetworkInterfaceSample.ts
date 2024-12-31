// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  NetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceParameters
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

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
  const options: NetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceParameters = {
    queryParameters: { "api-version": "2018-10-01" }
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
