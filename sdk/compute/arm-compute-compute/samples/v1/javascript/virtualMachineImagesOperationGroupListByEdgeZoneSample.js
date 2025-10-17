// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of all virtual machine image versions for the specified edge zone
 *
 * @summary gets a list of all virtual machine image versions for the specified edge zone
 * x-ms-original-file: 2025-04-01/virtualMachineImageExamples/VirtualMachineImagesEdgeZone_ListByEdgeZone_MaximumSet_Gen.json
 */
async function virtualMachineImagesEdgeZoneListByEdgeZoneMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5ece5940-d962-4dad-a98f-ca9ac0f021a5";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesOperationGroup.listByEdgeZone(
    "WestUS",
    "microsoftlosangeles1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a list of all virtual machine image versions for the specified edge zone
 *
 * @summary gets a list of all virtual machine image versions for the specified edge zone
 * x-ms-original-file: 2025-04-01/virtualMachineImageExamples/VirtualMachineImagesEdgeZone_ListByEdgeZone_MinimumSet_Gen.json
 */
async function virtualMachineImagesEdgeZoneListByEdgeZoneMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5ece5940-d962-4dad-a98f-ca9ac0f021a5";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesOperationGroup.listByEdgeZone(
    "WestUS",
    "microsoftlosangeles1",
  );
  console.log(result);
}

async function main() {
  await virtualMachineImagesEdgeZoneListByEdgeZoneMaximumSetGen();
  await virtualMachineImagesEdgeZoneListByEdgeZoneMinimumSetGen();
}

main().catch(console.error);
