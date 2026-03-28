// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the keys associated with this workspace. This includes keys for the storage account, app insights and password for container registry.
 *
 * @summary lists all the keys associated with this workspace. This includes keys for the storage account, app insights and password for container registry.
 * x-ms-original-file: 2025-12-01/Workspace/listKeys.json
 */
async function listWorkspaceKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.workspaces.listKeys("testrg123", "workspaces123");
  console.log(result);
}

async function main() {
  await listWorkspaceKeys();
}

main().catch(console.error);
