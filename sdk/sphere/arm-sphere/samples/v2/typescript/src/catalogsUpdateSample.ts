// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSphereClient } from "@azure/arm-sphere";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Catalog
 *
 * @summary update a Catalog
 * x-ms-original-file: 2024-04-01/PatchCatalog.json
 */
async function catalogsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const result = await client.catalogs.update("MyResourceGroup1", "MyCatalog1", {});
  console.log(result);
}

async function main(): Promise<void> {
  await catalogsUpdate();
}

main().catch(console.error);
