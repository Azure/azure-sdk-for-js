// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a BuilderResource
 *
 * @summary get a BuilderResource
 * x-ms-original-file: 2025-10-02-preview/Builders_Get.json
 */
async function buildersGet0() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.builders.get("rg", "testBuilder");
  console.log(result);
}

async function main() {
  await buildersGet0();
}

main().catch(console.error);
