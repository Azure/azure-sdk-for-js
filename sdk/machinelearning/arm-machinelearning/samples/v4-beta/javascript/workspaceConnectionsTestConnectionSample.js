// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to test machine learning workspaces connections under the specified workspace.
 *
 * @summary test machine learning workspaces connections under the specified workspace.
 * x-ms-original-file: 2026-03-15-preview/WorkspaceConnection/testConnection.json
 */
async function testWorkspaceConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.workspaceConnections.testConnection(
    "resourceGroup-1",
    "workspace-1",
    "connection-1",
    {
      body: {
        properties: {
          authType: "None",
          category: "ContainerRegistry",
          expiryTime: new Date("2024-03-15T14:30:00Z"),
          target: "target_url",
        },
      },
    },
  );
}

async function main() {
  await testWorkspaceConnection();
}

main().catch(console.error);
