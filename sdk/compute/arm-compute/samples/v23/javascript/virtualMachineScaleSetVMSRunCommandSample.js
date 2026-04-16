// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Run command on a virtual machine in a VM scale set.
 *
 * @summary Run command on a virtual machine in a VM scale set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/runCommandExamples/VirtualMachineScaleSetVMRunCommand.json
 */
async function virtualMachineScaleSetVMSRunCommand() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const vmScaleSetName = "myVirtualMachineScaleSet";
  const instanceId = "0";
  const parameters = {
    commandId: "RunPowerShellScript",
    script: ["Write-Host Hello World!"],
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMs.beginRunCommandAndWait(
    resourceGroupName,
    vmScaleSetName,
    instanceId,
    parameters,
  );
  console.log(result);
}

async function main() {
  await virtualMachineScaleSetVMSRunCommand();
}

main().catch(console.error);
