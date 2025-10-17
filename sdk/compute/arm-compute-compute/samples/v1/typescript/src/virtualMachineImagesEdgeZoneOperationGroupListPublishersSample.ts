// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of virtual machine image publishers for the specified Azure location and edge zone.
 *
 * @summary gets a list of virtual machine image publishers for the specified Azure location and edge zone.
 * x-ms-original-file: 2025-04-01/virtualMachineImageExamples/VirtualMachineImagesEdgeZone_ListPublishers_MaximumSet_Gen.json
 */
async function virtualMachineImagesEdgeZoneListPublishersMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesEdgeZoneOperationGroup.listPublishers(
    "aaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a list of virtual machine image publishers for the specified Azure location and edge zone.
 *
 * @summary gets a list of virtual machine image publishers for the specified Azure location and edge zone.
 * x-ms-original-file: 2025-04-01/virtualMachineImageExamples/VirtualMachineImagesEdgeZone_ListPublishers_MinimumSet_Gen.json
 */
async function virtualMachineImagesEdgeZoneListPublishersMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesEdgeZoneOperationGroup.listPublishers(
    "aaaa",
    "aaaaaaaaaaaaaaaaaaaaaaa",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineImagesEdgeZoneListPublishersMaximumSetGen();
  await virtualMachineImagesEdgeZoneListPublishersMinimumSetGen();
}

main().catch(console.error);
