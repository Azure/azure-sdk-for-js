// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the Container Apps in a given resource group.
 *
 * @summary get the Container Apps in a given resource group.
 * x-ms-original-file: 2025-10-02-preview/ContainerApps_ListByResourceGroup.json
 */
async function listContainerAppsByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.containerApps.listByResourceGroup("rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listContainerAppsByResourceGroup();
}

main().catch(console.error);
