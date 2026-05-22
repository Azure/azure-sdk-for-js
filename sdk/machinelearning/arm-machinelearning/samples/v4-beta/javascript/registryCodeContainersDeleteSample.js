// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete Code container.
 *
 * @summary delete Code container.
 * x-ms-original-file: 2025-12-01/Registry/CodeContainer/delete.json
 */
async function deleteRegistryCodeContainer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.registryCodeContainers.delete("testrg123", "testregistry", "testContainer");
}

async function main() {
  await deleteRegistryCodeContainer();
}

main().catch(console.error);
