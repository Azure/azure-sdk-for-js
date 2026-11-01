// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list EdgeMachineSecuritySettings by EdgeMachine
 *
 * @summary list EdgeMachineSecuritySettings by EdgeMachine
 * x-ms-original-file: 2026-10-01/EdgeMachineSecuritySettingsOperations_ListByEdgeMachine.json
 */
async function listEdgeMachineSecuritySettings() {
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

async function main() {
  await listEdgeMachineSecuritySettings();
}

main().catch(console.error);
