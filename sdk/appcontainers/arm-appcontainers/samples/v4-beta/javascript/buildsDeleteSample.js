// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a BuildResource
 *
 * @summary delete a BuildResource
 * x-ms-original-file: 2025-10-02-preview/Builds_Delete.json
 */
async function buildsDelete0() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.builds.delete("rg", "testBuilder", "testBuild");
}

async function main() {
  await buildsDelete0();
}

main().catch(console.error);
