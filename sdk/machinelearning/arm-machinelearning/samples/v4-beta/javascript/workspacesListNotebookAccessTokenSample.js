// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Azure Machine Learning Workspace notebook access token
 *
 * @summary get Azure Machine Learning Workspace notebook access token
 * x-ms-original-file: 2025-12-01/Workspace/listNotebookAccessToken.json
 */
async function listWorkspaceKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.workspaces.listNotebookAccessToken("workspace-1234", "testworkspace");
  console.log(result);
}

async function main() {
  await listWorkspaceKeys();
}

main().catch(console.error);
