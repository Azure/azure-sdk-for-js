// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeBulkActionsClient } = require("@azure/arm-computebulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to virtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines
 *
 * @summary virtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines
 * x-ms-original-file: 2026-02-01-preview/BulkActions_VirtualMachinesGetOperationStatus_MaximumSet_Gen.json
 */
async function bulkActionsVirtualMachinesGetOperationStatusMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "D8E30CC0-2763-4FCC-84A8-3C5659281032";
  const client = new ComputeBulkActionsClient(credential, subscriptionId);
  const result = await client.bulkActions.virtualMachinesGetOperationStatus("eastus2euap", {
    operationIds: ["2a3fce8e-874c-45f4-9d27-1a804f3b7a0f"],
    correlationid: "4431320c-7a90-4300-b82b-73f0696ae50e",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to virtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines
 *
 * @summary virtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines
 * x-ms-original-file: 2026-02-01-preview/BulkActions_VirtualMachinesGetOperationStatus_MinimumSet_Gen.json
 */
async function bulkActionsVirtualMachinesGetOperationStatusMinimumSetGenGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "50352BBD-59F1-4EE2-BA9C-A6E51B0B1B2B";
  const client = new ComputeBulkActionsClient(credential, subscriptionId);
  const result = await client.bulkActions.virtualMachinesGetOperationStatus("eastus2euap", {
    operationIds: ["23480d2f-1dca-4610-afb4-dd25eec1f34r"],
    correlationid: "4431320c-7a90-4300-b82b-73f0696ae50e",
  });
  console.log(result);
}

async function main() {
  await bulkActionsVirtualMachinesGetOperationStatusMaximumSetGenGeneratedByMaximumSetRule();
  await bulkActionsVirtualMachinesGetOperationStatusMinimumSetGenGeneratedByMinimumSetRule();
}

main().catch(console.error);
