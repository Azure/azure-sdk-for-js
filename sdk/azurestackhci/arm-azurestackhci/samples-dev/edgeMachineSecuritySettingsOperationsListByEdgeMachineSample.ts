// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list EdgeMachineSecuritySettings by EdgeMachine
 *
 * @summary list EdgeMachineSecuritySettings by EdgeMachine
 * x-ms-original-file: 2026-10-01/EdgeMachineSecuritySettingsOperations_ListByEdgeMachine.json
 */
async function listEdgeMachineSecuritySettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.edgeMachineSecuritySettingsOperations.listByEdgeMachine(
    "test-rg",
    "testEdgeMachine",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listEdgeMachineSecuritySettings();
}

main().catch(console.error);
