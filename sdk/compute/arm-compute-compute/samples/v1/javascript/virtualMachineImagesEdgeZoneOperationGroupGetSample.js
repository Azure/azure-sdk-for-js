// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a virtual machine image in an edge zone.
 *
 * @summary gets a virtual machine image in an edge zone.
 * x-ms-original-file: 2025-04-01/virtualMachineImageExamples/VirtualMachineImagesEdgeZone_Get_MaximumSet_Gen.json
 */
async function virtualMachineImagesEdgeZoneGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesEdgeZoneOperationGroup.get(
    "aaaaaaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a virtual machine image in an edge zone.
 *
 * @summary gets a virtual machine image in an edge zone.
 * x-ms-original-file: 2025-04-01/virtualMachineImageExamples/VirtualMachineImagesEdgeZone_Get_MinimumSet_Gen.json
 */
async function virtualMachineImagesEdgeZoneGetMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesEdgeZoneOperationGroup.get(
    "aaaaaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaa",
    "aa",
  );
  console.log(result);
}

async function main() {
  await virtualMachineImagesEdgeZoneGetMaximumSetGen();
  await virtualMachineImagesEdgeZoneGetMinimumSetGen();
}

main().catch(console.error);
