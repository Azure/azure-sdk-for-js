// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureSphereClient } = require("@azure/arm-sphere");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Catalog
 *
 * @summary delete a Catalog
 * x-ms-original-file: 2024-04-01/DeleteCatalog.json
 */
async function catalogsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  await client.catalogs.delete("MyResourceGroup1", "MyCatalog1");
}

async function main() {
  await catalogsDelete();
}

main().catch(console.error);
