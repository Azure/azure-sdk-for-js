// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an connectedEnvironment.
 *
 * @summary delete an connectedEnvironment.
 * x-ms-original-file: 2025-10-02-preview/ConnectedEnvironments_Delete.json
 */
async function deleteConnectedEnvironmentByConnectedEnvironmentName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.connectedEnvironments.delete("examplerg", "examplekenv");
}

async function main() {
  await deleteConnectedEnvironmentByConnectedEnvironmentName();
}

main().catch(console.error);
