// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to trigger an on-demand sync of edge machine security settings from Guest Configuration.
 * Creates the default security settings child resource if it does not already exist.
 *
 * @summary trigger an on-demand sync of edge machine security settings from Guest Configuration.
 * Creates the default security settings child resource if it does not already exist.
 * x-ms-original-file: 2026-10-01/EdgeMachines_RefreshSecuritySettings.json
 */
async function refreshEdgeMachineSecuritySettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.edgeMachines.refreshSecuritySettings("test-rg", "testEdgeMachine");
}

async function main(): Promise<void> {
  await refreshEdgeMachineSecuritySettings();
}

main().catch(console.error);
