// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete registry
 *
 * @summary delete registry
 * x-ms-original-file: 2025-12-01/Registries/delete.json
 */
async function deleteRegistry() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.registries.delete("test-rg", "string");
}

async function main() {
  await deleteRegistry();
}

main().catch(console.error);
