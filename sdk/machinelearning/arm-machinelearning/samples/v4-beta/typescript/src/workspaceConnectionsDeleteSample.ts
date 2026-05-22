// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete machine learning workspaces connections by name.
 *
 * @summary delete machine learning workspaces connections by name.
 * x-ms-original-file: 2025-12-01/WorkspaceConnection/delete.json
 */
async function deleteWorkspaceConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.workspaceConnections.delete("resourceGroup-1", "workspace-1", "connection-1");
}

async function main(): Promise<void> {
  await deleteWorkspaceConnection();
}

main().catch(console.error);
