// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureSphereClient } = require("@azure/arm-sphere");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Catalog
 *
 * @summary update a Catalog
 * x-ms-original-file: 2024-04-01/PatchCatalog.json
 */
async function catalogsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const result = await client.catalogs.update("MyResourceGroup1", "MyCatalog1", {});
  console.log(result);
}

async function main() {
  await catalogsUpdate();
}

main().catch(console.error);
