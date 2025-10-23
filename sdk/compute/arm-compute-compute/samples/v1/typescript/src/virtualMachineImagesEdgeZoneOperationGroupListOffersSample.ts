// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of virtual machine image offers for the specified location, edge zone and publisher.
 *
 * @summary gets a list of virtual machine image offers for the specified location, edge zone and publisher.
 * x-ms-original-file: 2025-04-01/virtualMachineImageExamples/VirtualMachineImagesEdgeZone_ListOffers_MaximumSet_Gen.json
 */
async function virtualMachineImagesEdgeZoneListOffersMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesEdgeZoneOperationGroup.listOffers(
    "aaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaa",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a list of virtual machine image offers for the specified location, edge zone and publisher.
 *
 * @summary gets a list of virtual machine image offers for the specified location, edge zone and publisher.
 * x-ms-original-file: 2025-04-01/virtualMachineImageExamples/VirtualMachineImagesEdgeZone_ListOffers_MinimumSet_Gen.json
 */
async function virtualMachineImagesEdgeZoneListOffersMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesEdgeZoneOperationGroup.listOffers(
    "aaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineImagesEdgeZoneListOffersMaximumSetGen();
  await virtualMachineImagesEdgeZoneListOffersMinimumSetGen();
}

main().catch(console.error);
