// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to update the VMSS VM extension.
 *
 * @summary the operation to update the VMSS VM extension.
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVMExtension_Update.json
 */
async function updateVirtualMachineScaleSetVMExtension() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMExtensions.update(
    "myResourceGroup",
    "myvmScaleSet",
    "0",
    "myVMExtension",
    {
      autoUpgradeMinorVersion: true,
      publisher: "extPublisher",
      typePropertiesType: "extType",
      typeHandlerVersion: "1.2",
      settings: { UserName: "xyz@microsoft.com" },
    },
  );
  console.log(result);
}

async function main() {
  await updateVirtualMachineScaleSetVMExtension();
}

main().catch(console.error);
