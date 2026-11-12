// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified private endpoint connection associated with a Container App.
 *
 * @summary deletes the specified private endpoint connection associated with a Container App.
 * x-ms-original-file: 2026-07-01/ContainerAppPrivateEndpointConnections_Delete.json
 */
async function deleteAPrivateEndpointConnectionByContainerApp(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.containerAppPrivateEndpointConnections.delete(
    "examplerg",
    "testcontainerapp0",
    "test-private-endpoint-connection",
  );
}

async function main(): Promise<void> {
  await deleteAPrivateEndpointConnectionByContainerApp();
}

main().catch(console.error);
