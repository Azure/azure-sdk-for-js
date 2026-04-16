// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Starts one or more virtual machines in a VM scale set.
 *
 * @summary Starts one or more virtual machines in a VM scale set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Start_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetStartMaximumSetGen() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaaaaaaaaaaa";
  const vmInstanceIDs = {
    instanceIds: ["aaaaaaaaaaaaaaaaa"],
  };
  const options = { vmInstanceIDs };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.beginStartAndWait(
    resourceGroupName,
    vmScaleSetName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Starts one or more virtual machines in a VM scale set.
 *
 * @summary Starts one or more virtual machines in a VM scale set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Start_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetStartMinimumSetGen() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaaaaaa";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.beginStartAndWait(
    resourceGroupName,
    vmScaleSetName,
  );
  console.log(result);
}

async function main() {
  await virtualMachineScaleSetStartMaximumSetGen();
  await virtualMachineScaleSetStartMinimumSetGen();
}

main().catch(console.error);
