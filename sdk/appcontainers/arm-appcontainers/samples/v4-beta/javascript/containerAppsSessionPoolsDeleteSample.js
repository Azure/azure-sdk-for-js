// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the session pool with the given name.
 *
 * @summary delete the session pool with the given name.
 * x-ms-original-file: 2025-10-02-preview/SessionPools_Delete.json
 */
async function deleteSessionPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.containerAppsSessionPools.delete("rg", "testsessionpool");
}

async function main() {
  await deleteSessionPool();
}

main().catch(console.error);
