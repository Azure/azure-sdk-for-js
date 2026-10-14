// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureSphereClient } = require("@azure/arm-sphere");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Catalog resources by subscription ID
 *
 * @summary list Catalog resources by subscription ID
 * x-ms-original-file: 2024-04-01/GetCatalogsSub.json
 */
async function catalogsListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.catalogs.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await catalogsListBySubscription();
}

main().catch(console.error);
