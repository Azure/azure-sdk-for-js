// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the session pools in a given resource group of a subscription.
 *
 * @summary get the session pools in a given resource group of a subscription.
 * x-ms-original-file: 2025-10-02-preview/SessionPools_ListByResourceGroup.json
 */
async function listSessionPoolsByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.containerAppsSessionPools.listByResourceGroup("rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listSessionPoolsByResourceGroup();
}

main().catch(console.error);
