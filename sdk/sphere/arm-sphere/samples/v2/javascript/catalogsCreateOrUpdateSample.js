// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureSphereClient } = require("@azure/arm-sphere");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Catalog
 *
 * @summary create a Catalog
 * x-ms-original-file: 2024-04-01/PutCatalog.json
 */
async function catalogsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const result = await client.catalogs.createOrUpdate("MyResourceGroup1", "MyCatalog1", {
    location: "global",
  });
  console.log(result);
}

async function main() {
  await catalogsCreateOrUpdate();
}

main().catch(console.error);
