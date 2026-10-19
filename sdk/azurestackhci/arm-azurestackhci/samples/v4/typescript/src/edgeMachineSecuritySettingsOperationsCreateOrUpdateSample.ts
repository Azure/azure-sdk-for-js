// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update an EdgeMachineSecuritySettings
 *
 * @summary create or update an EdgeMachineSecuritySettings
 * x-ms-original-file: 2026-10-01/EdgeMachineSecuritySettingsOperations_CreateOrUpdate.json
 */
async function createOrUpdateEdgeMachineSecuritySettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineSecuritySettingsOperations.createOrUpdate(
    "test-rg",
    "testEdgeMachine",
    "default",
    { properties: {} },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateEdgeMachineSecuritySettings();
}

main().catch(console.error);
