// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list BuildResource resources by BuilderResource
 *
 * @summary list BuildResource resources by BuilderResource
 * x-ms-original-file: 2025-10-02-preview/Builds_ListByBuilderResource.json
 */
async function buildsListByBuilderResource0() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.buildsByBuilderResource.list("rg", "testBuilder")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await buildsListByBuilderResource0();
}

main().catch(console.error);
