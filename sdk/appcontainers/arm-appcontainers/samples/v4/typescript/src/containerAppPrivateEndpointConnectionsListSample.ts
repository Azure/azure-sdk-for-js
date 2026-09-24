// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all private endpoint connections associated with a Container App.
 *
 * @summary lists all private endpoint connections associated with a Container App.
 * x-ms-original-file: 2026-07-01/ContainerAppPrivateEndpointConnections_List.json
 */
async function listPrivateEndpointConnectionsByContainerApp(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.containerAppPrivateEndpointConnections.list(
    "examplerg",
    "testcontainerapp0",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listPrivateEndpointConnectionsByContainerApp();
}

main().catch(console.error);
