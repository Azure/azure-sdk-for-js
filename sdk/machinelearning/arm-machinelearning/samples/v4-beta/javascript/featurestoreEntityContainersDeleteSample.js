// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete container.
 *
 * @summary delete container.
 * x-ms-original-file: 2025-12-01/Workspace/FeaturestoreEntityContainer/delete.json
 */
async function deleteWorkspaceFeaturestoreEntityContainer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.featurestoreEntityContainers.delete("test-rg", "my-aml-workspace", "string");
}

async function main() {
  await deleteWorkspaceFeaturestoreEntityContainer();
}

main().catch(console.error);
