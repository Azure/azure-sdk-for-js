// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  PublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressParameters
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Get the specified public IP address in a virtual machine scale set.
 *
 * @summary Get the specified public IP address in a virtual machine scale set.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VmssPublicIpGet.json
 */
async function getVmssPublicIP() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "vmss-tester";
  const virtualMachineScaleSetName = "vmss1";
  const virtualmachineIndex = "1";
  const networkInterfaceName = "nic1";
  const ipConfigurationName = "ip1";
  const publicIpAddressName = "pub1";
  const options: PublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressParameters = {
    queryParameters: { "api-version": "2018-10-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{virtualMachineScaleSetName}/virtualMachines/{virtualmachineIndex}/networkInterfaces/{networkInterfaceName}/ipconfigurations/{ipConfigurationName}/publicipaddresses/{publicIpAddressName}",
      subscriptionId,
      resourceGroupName,
      virtualMachineScaleSetName,
      virtualmachineIndex,
      networkInterfaceName,
      ipConfigurationName,
      publicIpAddressName
    )
    .get(options);
  console.log(result);
}

getVmssPublicIP().catch(console.error);
