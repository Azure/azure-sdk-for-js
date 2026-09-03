// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get details for specific Container Apps Patch by patch name.
 *
 * @summary get details for specific Container Apps Patch by patch name.
 * x-ms-original-file: 2025-10-02-preview/ContainerAppsPatches_Get.json
 */
async function containerAppsPatchesGet0() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsPatches.get("rg", "test-app", "testPatch-25fe4b");
  console.log(result);
}

async function main() {
  await containerAppsPatchesGet0();
}

main().catch(console.error);
