// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a BuildResource
 *
 * @summary get a BuildResource
 * x-ms-original-file: 2025-10-02-preview/Builds_Get.json
 */
async function buildsGet0() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.builds.get("rg", "testBuilder", "testBuild");
  console.log(result);
}

async function main() {
  await buildsGet0();
}

main().catch(console.error);
