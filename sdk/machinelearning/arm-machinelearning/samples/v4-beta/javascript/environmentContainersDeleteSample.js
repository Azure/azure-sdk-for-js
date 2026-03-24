// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete container.
 *
 * @summary delete container.
 * x-ms-original-file: 2025-12-01/Workspace/EnvironmentContainer/delete.json
 */
async function deleteWorkspaceEnvironmentContainer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.environmentContainers.delete("testrg123", "testworkspace", "testContainer");
}

async function main() {
  await deleteWorkspaceEnvironmentContainer();
}

main().catch(console.error);
