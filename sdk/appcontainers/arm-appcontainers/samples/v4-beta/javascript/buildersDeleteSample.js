// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a BuilderResource
 *
 * @summary delete a BuilderResource
 * x-ms-original-file: 2025-10-02-preview/Builders_Delete.json
 */
async function buildersDelete0() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.builders.delete("rg", "testBuilder");
}

async function main() {
  await buildersDelete0();
}

main().catch(console.error);
