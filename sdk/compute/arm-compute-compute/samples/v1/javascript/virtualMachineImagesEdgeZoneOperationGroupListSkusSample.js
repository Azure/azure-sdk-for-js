// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of virtual machine image SKUs for the specified location, edge zone, publisher, and offer.
 *
 * @summary gets a list of virtual machine image SKUs for the specified location, edge zone, publisher, and offer.
 * x-ms-original-file: 2025-04-01/virtualMachineImageExamples/VirtualMachineImagesEdgeZone_ListSkus_MaximumSet_Gen.json
 */
async function virtualMachineImagesEdgeZoneListSkusMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesEdgeZoneOperationGroup.listSkus(
    "aaaaaaaaaaaa",
    "aaaaa",
    "aaaaaaaaaaaa",
    "aaaaaaaaaaaa",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a list of virtual machine image SKUs for the specified location, edge zone, publisher, and offer.
 *
 * @summary gets a list of virtual machine image SKUs for the specified location, edge zone, publisher, and offer.
 * x-ms-original-file: 2025-04-01/virtualMachineImageExamples/VirtualMachineImagesEdgeZone_ListSkus_MinimumSet_Gen.json
 */
async function virtualMachineImagesEdgeZoneListSkusMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesEdgeZoneOperationGroup.listSkus(
    "aaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaa",
    "aaaaaaaaaaaa",
  );
  console.log(result);
}

async function main() {
  await virtualMachineImagesEdgeZoneListSkusMaximumSetGen();
  await virtualMachineImagesEdgeZoneListSkusMinimumSetGen();
}

main().catch(console.error);
