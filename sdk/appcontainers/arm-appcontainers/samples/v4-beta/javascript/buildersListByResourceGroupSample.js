// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list BuilderResource resources by resource group
 *
 * @summary list BuilderResource resources by resource group
 * x-ms-original-file: 2025-10-02-preview/Builders_ListByResourceGroup.json
 */
async function buildersListByResourceGroup0() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.builders.listByResourceGroup("rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await buildersListByResourceGroup0();
}

main().catch(console.error);
