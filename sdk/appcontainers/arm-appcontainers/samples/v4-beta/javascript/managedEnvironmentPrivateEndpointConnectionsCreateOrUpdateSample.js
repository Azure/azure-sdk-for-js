// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the state of a private endpoint connection for a given managed environment.
 *
 * @summary update the state of a private endpoint connection for a given managed environment.
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironmentPrivateEndpointConnections_CreateOrUpdate.json
 */
async function updateAPrivateEndpointConnectionByManagedEnvironment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.managedEnvironmentPrivateEndpointConnections.createOrUpdate(
    "examplerg",
    "managedEnv",
    "jlaw-demo1",
    { privateLinkServiceConnectionState: { actionsRequired: "None", status: "Approved" } },
  );
  console.log(result);
}

async function main() {
  await updateAPrivateEndpointConnectionByManagedEnvironment();
}

main().catch(console.error);
