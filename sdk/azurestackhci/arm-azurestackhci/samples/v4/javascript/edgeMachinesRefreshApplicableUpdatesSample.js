// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to trigger an on-demand refresh of applicable updates for the edge machine.
 * Creates or updates the default EdgeMachineUpdate child resource with the latest set of applicable updates.
 *
 * @summary trigger an on-demand refresh of applicable updates for the edge machine.
 * Creates or updates the default EdgeMachineUpdate child resource with the latest set of applicable updates.
 * x-ms-original-file: 2026-10-01/EdgeMachines_RefreshApplicableUpdates.json
 */
async function refreshEdgeMachineApplicableUpdates() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.edgeMachines.refreshApplicableUpdates("test-rg", "testEdgeMachine");
}

async function main() {
  await refreshEdgeMachineApplicableUpdates();
}

main().catch(console.error);
