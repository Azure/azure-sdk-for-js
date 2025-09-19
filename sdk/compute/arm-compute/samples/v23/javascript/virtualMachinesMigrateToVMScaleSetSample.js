// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Migrate a virtual machine from availability set to Flexible Virtual Machine Scale Set.
 *
 * @summary Migrate a virtual machine from availability set to Flexible Virtual Machine Scale Set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineExamples/VirtualMachine_MigrateToVirtualMachineScaleSet.json
 */
async function migrateAVirtualMachineToFlexibleVirtualMachineScaleSer() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const vmName = "myVMName";
  const parameters = {
    targetFaultDomain: 0,
    targetVMSize: "Standard_D1_v2",
  };
  const options = {
    parameters,
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.beginMigrateToVMScaleSetAndWait(
    resourceGroupName,
    vmName,
    options,
  );
  console.log(result);
}

async function main() {
  await migrateAVirtualMachineToFlexibleVirtualMachineScaleSer();
}

main().catch(console.error);
