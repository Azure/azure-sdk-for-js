// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to trigger an on-demand refresh of applicable updates for the edge machine.
 * Creates or updates the default EdgeMachineUpdate child resource with the latest set of applicable updates.
 *
 * @summary trigger an on-demand refresh of applicable updates for the edge machine.
 * Creates or updates the default EdgeMachineUpdate child resource with the latest set of applicable updates.
 * x-ms-original-file: 2026-10-01/EdgeMachines_RefreshApplicableUpdates.json
 */
async function refreshEdgeMachineApplicableUpdates(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.edgeMachines.refreshApplicableUpdates("test-rg", "testEdgeMachine");
}

async function main(): Promise<void> {
  await refreshEdgeMachineApplicableUpdates();
}

main().catch(console.error);
