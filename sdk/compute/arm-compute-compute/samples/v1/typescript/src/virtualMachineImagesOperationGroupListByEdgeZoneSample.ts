// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of all virtual machine image versions for the specified edge zone
 *
 * @summary gets a list of all virtual machine image versions for the specified edge zone
 * x-ms-original-file: 2025-04-01/virtualMachineImageExamples/VirtualMachineImagesEdgeZone_ListByEdgeZone_MaximumSet_Gen.json
 */
async function virtualMachineImagesEdgeZoneListByEdgeZoneMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5ece5940-d962-4dad-a98f-ca9ac0f021a5";
  const client = new ComputeClient(credential, subscriptionId);
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
async function virtualMachineImagesEdgeZoneListByEdgeZoneMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5ece5940-d962-4dad-a98f-ca9ac0f021a5";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesOperationGroup.listByEdgeZone(
    "WestUS",
    "microsoftlosangeles1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineImagesEdgeZoneListByEdgeZoneMaximumSetGen();
  await virtualMachineImagesEdgeZoneListByEdgeZoneMinimumSetGen();
}

main().catch(console.error);
