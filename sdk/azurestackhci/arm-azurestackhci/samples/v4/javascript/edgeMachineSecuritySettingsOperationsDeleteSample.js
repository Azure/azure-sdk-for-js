// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an EdgeMachineSecuritySettings
 *
 * @summary delete an EdgeMachineSecuritySettings
 * x-ms-original-file: 2026-10-01/EdgeMachineSecuritySettingsOperations_Delete.json
 */
async function deleteEdgeMachineSecuritySettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.edgeMachineSecuritySettingsOperations.delete(
    "test-rg",
    "testEdgeMachine",
    "default",
  );
}

async function main() {
  await deleteEdgeMachineSecuritySettings();
}

main().catch(console.error);
