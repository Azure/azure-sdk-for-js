// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an Edge Machine Deployment Setting.
 *
 * @summary delete an Edge Machine Deployment Setting.
 * x-ms-original-file: 2026-10-01/EdgeMachineDeploymentSettings_Delete.json
 */
async function edgeMachineDeploymentSettingsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.edgeMachineDeploymentSettings.delete("test-rg", "EdgeMachine01", "default");
}

async function main(): Promise<void> {
  await edgeMachineDeploymentSettingsDelete();
}

main().catch(console.error);
