// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Container App AuthConfig.
 *
 * @summary delete a Container App AuthConfig.
 * x-ms-original-file: 2025-10-02-preview/AuthConfigs_Delete.json
 */
async function deleteContainerAppAuthConfig() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "651f8027-33e8-4ec4-97b4-f6e9f3dc8744";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.containerAppsAuthConfigs.delete("workerapps-rg-xj", "testcanadacentral", "current");
}

async function main() {
  await deleteContainerAppAuthConfig();
}

main().catch(console.error);
