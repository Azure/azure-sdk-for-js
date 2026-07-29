// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete storage for a connectedEnvironment.
 *
 * @summary delete storage for a connectedEnvironment.
 * x-ms-original-file: 2025-10-02-preview/ConnectedEnvironmentsStorages_Delete.json
 */
async function listEnvironmentsStoragesBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.connectedEnvironmentsStorages.delete("examplerg", "env", "jlaw-demo1");
}

async function main() {
  await listEnvironmentsStoragesBySubscription();
}

main().catch(console.error);
