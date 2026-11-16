// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get an EdgeMachineSecuritySettings
 *
 * @summary get an EdgeMachineSecuritySettings
 * x-ms-original-file: 2026-10-01/EdgeMachineSecuritySettingsOperations_Get.json
 */
async function getEdgeMachineSecuritySettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineSecuritySettingsOperations.get(
    "test-rg",
    "testEdgeMachine",
    "default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getEdgeMachineSecuritySettings();
}

main().catch(console.error);
