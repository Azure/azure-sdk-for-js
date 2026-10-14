// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSphereClient } from "@azure/arm-sphere";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Product resources by Catalog
 *
 * @summary list Product resources by Catalog
 * x-ms-original-file: 2024-04-01/GetProducts.json
 */
async function productsListByCatalog(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.products.listByCatalog("MyResourceGroup1", "MyCatalog1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await productsListByCatalog();
}

main().catch(console.error);
