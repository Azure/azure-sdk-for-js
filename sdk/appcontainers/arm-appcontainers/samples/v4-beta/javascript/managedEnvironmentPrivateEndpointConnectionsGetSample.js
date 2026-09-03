// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a private endpoint connection for a given managed environment.
 *
 * @summary get a private endpoint connection for a given managed environment.
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironmentPrivateEndpointConnections_Get.json
 */
async function getAPrivateEndpointConnectionByManagedEnvironment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.managedEnvironmentPrivateEndpointConnections.get(
    "examplerg",
    "managedEnv",
    "jlaw-demo1",
  );
  console.log(result);
}

async function main() {
  await getAPrivateEndpointConnectionByManagedEnvironment();
}

main().catch(console.error);
