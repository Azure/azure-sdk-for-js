// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSphereClient } from "@azure/arm-sphere";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name'
 *
 * @summary delete a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name'
 * x-ms-original-file: 2024-04-01/DeleteProduct.json
 */
async function productsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  await client.products.delete("MyResourceGroup1", "MyCatalog1", "MyProductName1");
}

async function main(): Promise<void> {
  await productsDelete();
}

main().catch(console.error);
