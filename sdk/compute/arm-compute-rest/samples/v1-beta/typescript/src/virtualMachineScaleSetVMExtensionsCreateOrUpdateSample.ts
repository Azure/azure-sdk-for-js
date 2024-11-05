// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  VirtualMachineScaleSetVMExtensionsCreateOrUpdateParameters,
  getLongRunningPoller
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to The operation to create or update the VMSS VM extension.
 *
 * @summary The operation to create or update the VMSS VM extension.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetVMExtensions_Create.json
 */
async function createVirtualMachineScaleSetVMExtension() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmScaleSetName = "myvmScaleSet";
  const instanceId = "0";
  const vmExtensionName = "myVMExtension";
  const options: VirtualMachineScaleSetVMExtensionsCreateOrUpdateParameters = {
    body: {
      properties: {
        type: "extType",
        autoUpgradeMinorVersion: true,
        publisher: "extPublisher",
        settings: { UserName: "xyz@microsoft.com" },
        typeHandlerVersion: "1.2"
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
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
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createVirtualMachineScaleSetVMExtension().catch(console.error);
