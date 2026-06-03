// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Container Apps Build resource
 *
 * @summary delete a Container Apps Build resource
 * x-ms-original-file: 2025-10-02-preview/ContainerAppsBuilds_Delete.json
 */
async function containerAppsBuildsDelete0() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.containerAppsBuilds.delete("rg", "testCapp", "testBuild");
}

async function main() {
  await containerAppsBuildsDelete0();
}

main().catch(console.error);
