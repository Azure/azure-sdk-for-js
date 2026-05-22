// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to called by end-users to delete a PE connection.
 *
 * @summary called by end-users to delete a PE connection.
 * x-ms-original-file: 2025-12-01/PrivateEndpointConnection/delete.json
 */
async function workspacePutPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "rg-1234",
    "testworkspace",
    "{privateEndpointConnectionName}",
  );
}

async function main(): Promise<void> {
  await workspacePutPrivateEndpointConnection();
}

main().catch(console.error);
