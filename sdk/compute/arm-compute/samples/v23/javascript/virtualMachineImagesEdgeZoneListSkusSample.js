// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a list of virtual machine image SKUs for the specified location, edge zone, publisher, and offer.
 *
 * @summary Gets a list of virtual machine image SKUs for the specified location, edge zone, publisher, and offer.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineImageExamples/VirtualMachineImagesEdgeZone_ListSkus_MaximumSet_Gen.json
 */
async function virtualMachineImagesEdgeZoneListSkusMaximumSetGen() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const location = "aaaaaaaaaaaa";
  const edgeZone = "aaaaa";
  const publisherName = "aaaaaaaaaaaa";
  const offer = "aaaaaaaaaaaa";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesEdgeZone.listSkus(
    location,
    edgeZone,
    publisherName,
    offer,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets a list of virtual machine image SKUs for the specified location, edge zone, publisher, and offer.
 *
 * @summary Gets a list of virtual machine image SKUs for the specified location, edge zone, publisher, and offer.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineImageExamples/VirtualMachineImagesEdgeZone_ListSkus_MinimumSet_Gen.json
 */
async function virtualMachineImagesEdgeZoneListSkusMinimumSetGen() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const location = "aaaaaaaaaaaaaaaaaaaa";
  const edgeZone = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const publisherName = "aaaaaaaaa";
  const offer = "aaaaaaaaaaaa";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesEdgeZone.listSkus(
    location,
    edgeZone,
    publisherName,
    offer,
  );
  console.log(result);
}

async function main() {
  await virtualMachineImagesEdgeZoneListSkusMaximumSetGen();
  await virtualMachineImagesEdgeZoneListSkusMinimumSetGen();
}

main().catch(console.error);
