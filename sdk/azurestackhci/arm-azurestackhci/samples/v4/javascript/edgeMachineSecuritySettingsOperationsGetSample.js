// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get an EdgeMachineSecuritySettings
 *
 * @summary get an EdgeMachineSecuritySettings
 * x-ms-original-file: 2026-10-01/EdgeMachineSecuritySettingsOperations_Get.json
 */
async function getEdgeMachineSecuritySettings() {
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

async function main() {
  await getEdgeMachineSecuritySettings();
}

main().catch(console.error);
