// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a list of SKUs available for your VM scale set, including the minimum and maximum VM instances allowed for each SKU.
 *
 * @summary Gets a list of SKUs available for your VM scale set, including the minimum and maximum VM instances allowed for each SKU.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSet_ListSkus_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetListSkusMaximumSetGen() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const vmScaleSetName = "aaaaaa";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineScaleSets.listSkus(
    resourceGroupName,
    vmScaleSetName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Gets a list of SKUs available for your VM scale set, including the minimum and maximum VM instances allowed for each SKU.
 *
 * @summary Gets a list of SKUs available for your VM scale set, including the minimum and maximum VM instances allowed for each SKU.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSet_ListSkus_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetListSkusMinimumSetGen() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaaa";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineScaleSets.listSkus(
    resourceGroupName,
    vmScaleSetName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await virtualMachineScaleSetListSkusMaximumSetGen();
  await virtualMachineScaleSetListSkusMinimumSetGen();
}

main().catch(console.error);
