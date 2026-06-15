// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Container Apps Build resource
 *
 * @summary get a Container Apps Build resource
 * x-ms-original-file: 2025-10-02-preview/ContainerAppsBuilds_Get.json
 */
async function containerAppsBuildsGet0() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsBuilds.get("rg", "testCapp", "testBuild");
  console.log(result);
}

async function main() {
  await containerAppsBuildsGet0();
}

main().catch(console.error);
