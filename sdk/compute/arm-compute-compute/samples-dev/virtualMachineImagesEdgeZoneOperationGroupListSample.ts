// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of all virtual machine image versions for the specified location, edge zone, publisher, offer, and SKU.
 *
 * @summary gets a list of all virtual machine image versions for the specified location, edge zone, publisher, offer, and SKU.
 * x-ms-original-file: 2025-04-01/virtualMachineImageExamples/VirtualMachineImagesEdgeZone_List_MaximumSet_Gen.json
 */
async function virtualMachineImagesEdgeZoneListMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesEdgeZoneOperationGroup.list(
    "aaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaa",
    "aaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaa",
    {
      expand: "aaaaaaaaaaaaaaaaaaaaaaaa",
      top: 12,
      orderby: "aaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a list of all virtual machine image versions for the specified location, edge zone, publisher, offer, and SKU.
 *
 * @summary gets a list of all virtual machine image versions for the specified location, edge zone, publisher, offer, and SKU.
 * x-ms-original-file: 2025-04-01/virtualMachineImageExamples/VirtualMachineImagesEdgeZone_List_MinimumSet_Gen.json
 */
async function virtualMachineImagesEdgeZoneListMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesEdgeZoneOperationGroup.list(
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "aaaaa",
    "aaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineImagesEdgeZoneListMaximumSetGen();
  await virtualMachineImagesEdgeZoneListMinimumSetGen();
}

main().catch(console.error);
