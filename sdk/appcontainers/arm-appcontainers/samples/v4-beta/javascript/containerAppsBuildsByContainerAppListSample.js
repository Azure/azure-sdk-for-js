// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Container Apps Build resources by Container App
 *
 * @summary list Container Apps Build resources by Container App
 * x-ms-original-file: 2025-10-02-preview/ContainerAppsBuilds_ListByContainerApp.json
 */
async function containerAppsBuildsListByContainerApp0() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.containerAppsBuildsByContainerApp.list("rg", "testCapp")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await containerAppsBuildsListByContainerApp0();
}

main().catch(console.error);
