// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  VirtualMachineScaleSetVMExtensionsUpdateParameters,
  getLongRunningPoller,
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to The operation to update the VMSS VM extension.
 *
 * @summary The operation to update the VMSS VM extension.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetVMExtensions_Update.json
 */
async function updateVirtualMachineScaleSetVMExtension() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmScaleSetName = "myvmScaleSet";
  const instanceId = "0";
  const vmExtensionName = "myVMExtension";
  const options: VirtualMachineScaleSetVMExtensionsUpdateParameters = {
    body: {
      properties: {
        type: "extType",
        autoUpgradeMinorVersion: true,
        publisher: "extPublisher",
        settings: { UserName: "xyz@microsoft.com" },
        typeHandlerVersion: "1.2",
      },
    },
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions/{vmExtensionName}",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName,
      instanceId,
      vmExtensionName
    )
    .patch(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

updateVirtualMachineScaleSetVMExtension().catch(console.error);
