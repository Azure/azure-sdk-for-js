// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSphereClient } from "@azure/arm-sphere";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name.
 *
 * @summary create a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name.
 * x-ms-original-file: 2024-04-01/PutProduct.json
 */
async function productsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const result = await client.products.createOrUpdate(
    "MyResourceGroup1",
    "MyCatalog1",
    "MyProduct1",
    {},
  );
  console.log(result);
}

async function main(): Promise<void> {
  await productsCreateOrUpdate();
}

main().catch(console.error);
