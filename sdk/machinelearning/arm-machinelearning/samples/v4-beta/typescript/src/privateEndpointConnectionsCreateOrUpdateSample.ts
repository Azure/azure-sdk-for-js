// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to called by end-users to approve or reject a PE connection.
 * This method must validate and forward the call to NRP.
 *
 * @summary called by end-users to approve or reject a PE connection.
 * This method must validate and forward the call to NRP.
 * x-ms-original-file: 2025-12-01/PrivateEndpointConnection/createOrUpdate.json
 */
async function workspacePutPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.createOrUpdate(
    "rg-1234",
    "testworkspace",
    "{privateEndpointConnectionName}",
    { privateLinkServiceConnectionState: { description: "Auto-Approved", status: "Approved" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await workspacePutPrivateEndpointConnection();
}

main().catch(console.error);
