// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists machine learning workspaces connections by name.
 *
 * @summary lists machine learning workspaces connections by name.
 * x-ms-original-file: 2025-12-01/WorkspaceConnection/get.json
 */
async function getWorkspaceConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.workspaceConnections.get(
    "resourceGroup-1",
    "workspace-1",
    "connection-1",
  );
  console.log(result);
}

async function main() {
  await getWorkspaceConnection();
}

main().catch(console.error);
