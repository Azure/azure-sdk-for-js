// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureSphereClient } = require("@azure/arm-sphere");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Catalog resources by resource group
 *
 * @summary list Catalog resources by resource group
 * x-ms-original-file: 2024-04-01/GetCatalogsRG.json
 */
async function catalogsListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.catalogs.listByResourceGroup("MyResourceGroup1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await catalogsListByResourceGroup();
}

main().catch(console.error);
