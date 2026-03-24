// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update machine learning workspaces connections under the specified workspace.
 *
 * @summary create or update machine learning workspaces connections under the specified workspace.
 * x-ms-original-file: 2025-12-01/WorkspaceConnection/create.json
 */
async function createWorkspaceConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.workspaceConnections.create(
    "resourceGroup-1",
    "workspace-1",
    "connection-1",
    {
      body: {
        properties: {
          authType: "None",
          category: "ContainerRegistry",
          expiryTime: new Date("2024-03-15T14:30:00Z"),
          target: "www.facebook.com",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createWorkspaceConnection();
}

main().catch(console.error);
