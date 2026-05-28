// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the Container Apps Jobs in a given resource group.
 *
 * @summary get the Container Apps Jobs in a given resource group.
 * x-ms-original-file: 2025-10-02-preview/Jobs_ListByResourceGroup.json
 */
async function listContainerAppsJobsByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobs.listByResourceGroup("rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listContainerAppsJobsByResourceGroup();
}

main().catch(console.error);
