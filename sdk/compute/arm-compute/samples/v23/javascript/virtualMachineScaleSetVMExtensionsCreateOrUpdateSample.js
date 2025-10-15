// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to The operation to create or update the VMSS VM extension.
 *
 * @summary The operation to create or update the VMSS VM extension.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetVMExtension_Create.json
 */
async function createVirtualMachineScaleSetVMExtension() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const vmScaleSetName = "myvmScaleSet";
  const instanceId = "0";
  const vmExtensionName = "myVMExtension";
  const extensionParameters = {
    typePropertiesType: "extType",
    autoUpgradeMinorVersion: true,
    publisher: "extPublisher",
    settings: { UserName: "xyz@microsoft.com" },
    typeHandlerVersion: "1.2",
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMExtensions.beginCreateOrUpdateAndWait(
    resourceGroupName,
    vmScaleSetName,
    instanceId,
    vmExtensionName,
    extensionParameters,
  );
  console.log(result);
}

async function main() {
  await createVirtualMachineScaleSetVMExtension();
}

main().catch(console.error);
