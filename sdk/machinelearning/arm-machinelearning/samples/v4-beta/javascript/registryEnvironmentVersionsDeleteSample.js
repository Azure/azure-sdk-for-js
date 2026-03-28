// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete version.
 *
 * @summary delete version.
 * x-ms-original-file: 2025-12-01/Registry/EnvironmentVersion/delete.json
 */
async function deleteRegistryEnvironmentVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.registryEnvironmentVersions.delete("test-rg", "my-aml-registry", "string", "string");
}

async function main() {
  await deleteRegistryEnvironmentVersion();
}

main().catch(console.error);
