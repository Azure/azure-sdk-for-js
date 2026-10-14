// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureSphereClient } = require("@azure/arm-sphere");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Product resources by Catalog
 *
 * @summary list Product resources by Catalog
 * x-ms-original-file: 2024-04-01/GetProducts.json
 */
async function productsListByCatalog() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.products.listByCatalog("MyResourceGroup1", "MyCatalog1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await productsListByCatalog();
}

main().catch(console.error);
