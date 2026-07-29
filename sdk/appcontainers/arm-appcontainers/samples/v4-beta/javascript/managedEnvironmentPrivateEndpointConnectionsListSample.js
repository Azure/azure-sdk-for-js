// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list private endpoint connections for a given managed environment.
 *
 * @summary list private endpoint connections for a given managed environment.
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironmentPrivateEndpointConnections_List.json
 */
async function listPrivateEndpointConnectionsByManagedEnvironment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedEnvironmentPrivateEndpointConnections.list(
    "examplerg",
    "managedEnv",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPrivateEndpointConnectionsByManagedEnvironment();
}

main().catch(console.error);
