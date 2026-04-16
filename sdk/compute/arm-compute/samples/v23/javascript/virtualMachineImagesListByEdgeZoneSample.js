// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a list of all virtual machine image versions for the specified edge zone
 *
 * @summary Gets a list of all virtual machine image versions for the specified edge zone
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineImageExamples/VirtualMachineImagesEdgeZone_ListByEdgeZone_MaximumSet_Gen.json
 */
async function virtualMachineImagesEdgeZoneListByEdgeZoneMaximumSetGen() {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "5ece5940-d962-4dad-a98f-ca9ac0f021a5";
  const location = "WestUS";
  const edgeZone = "microsoftlosangeles1";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImages.listByEdgeZone(location, edgeZone);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets a list of all virtual machine image versions for the specified edge zone
 *
 * @summary Gets a list of all virtual machine image versions for the specified edge zone
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineImageExamples/VirtualMachineImagesEdgeZone_ListByEdgeZone_MinimumSet_Gen.json
 */
async function virtualMachineImagesEdgeZoneListByEdgeZoneMinimumSetGen() {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "5ece5940-d962-4dad-a98f-ca9ac0f021a5";
  const location = "WestUS";
  const edgeZone = "microsoftlosangeles1";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImages.listByEdgeZone(location, edgeZone);
  console.log(result);
}

async function main() {
  await virtualMachineImagesEdgeZoneListByEdgeZoneMaximumSetGen();
  await virtualMachineImagesEdgeZoneListByEdgeZoneMinimumSetGen();
}

main().catch(console.error);
