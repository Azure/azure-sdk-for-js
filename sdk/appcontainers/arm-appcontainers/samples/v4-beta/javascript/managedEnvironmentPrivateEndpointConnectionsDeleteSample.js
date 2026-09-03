// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a private endpoint connection for a given managed environment.
 *
 * @summary delete a private endpoint connection for a given managed environment.
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironmentPrivateEndpointConnections_Delete.json
 */
async function deleteAPrivateEndpointConnectionByManagedEnvironment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.managedEnvironmentPrivateEndpointConnections.delete(
    "examplerg",
    "managedEnv",
    "jlaw-demo1",
  );
}

async function main() {
  await deleteAPrivateEndpointConnectionByManagedEnvironment();
}

main().catch(console.error);
