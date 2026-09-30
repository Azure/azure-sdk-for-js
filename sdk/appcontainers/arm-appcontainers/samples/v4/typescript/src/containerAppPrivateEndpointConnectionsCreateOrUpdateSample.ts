// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a private endpoint connection or updates its connection state for a Container App.
 *
 * @summary creates a private endpoint connection or updates its connection state for a Container App.
 * x-ms-original-file: 2026-07-01/ContainerAppPrivateEndpointConnections_CreateOrUpdate.json
 */
async function updateAPrivateEndpointConnectionByContainerApp(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppPrivateEndpointConnections.createOrUpdate(
    "examplerg",
    "testcontainerapp0",
    "test-private-endpoint-connection",
    { privateLinkServiceConnectionState: { actionsRequired: "None", status: "Approved" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAPrivateEndpointConnectionByContainerApp();
}

main().catch(console.error);
