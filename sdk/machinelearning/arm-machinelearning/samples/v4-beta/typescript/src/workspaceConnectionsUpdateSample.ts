// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update machine learning workspaces connections under the specified workspace.
 *
 * @summary update machine learning workspaces connections under the specified workspace.
 * x-ms-original-file: 2025-12-01/WorkspaceConnection/update.json
 */
async function updateWorkspaceConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.workspaceConnections.update(
    "test-rg",
    "workspace-1",
    "connection-1",
    {
      body: {
        properties: {
          authType: "AccessKey",
          category: "ADLSGen2",
          credentials: { accessKeyId: "some_string", secretAccessKey: "some_string" },
          expiryTime: new Date("2020-01-01T00:00:00Z"),
          metadata: {},
          target: "some_string",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateWorkspaceConnection();
}

main().catch(console.error);
