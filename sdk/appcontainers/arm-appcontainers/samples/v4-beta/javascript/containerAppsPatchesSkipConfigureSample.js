// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to configure the Container Apps Patch skip option by patch name.
 *
 * @summary configure the Container Apps Patch skip option by patch name.
 * x-ms-original-file: 2025-10-02-preview/ContainerAppsPatches_Skip_Configure.json
 */
async function containerAppsPatchesSkipConfigure0() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.containerAppsPatches.skipConfigure("rg", "test-app", "testPatch-25fe4b", {
    skip: true,
  });
}

async function main() {
  await containerAppsPatchesSkipConfigure0();
}

main().catch(console.error);
