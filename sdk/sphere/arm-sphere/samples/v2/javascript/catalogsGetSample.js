// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureSphereClient } = require("@azure/arm-sphere");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Catalog
 *
 * @summary get a Catalog
 * x-ms-original-file: 2024-04-01/GetCatalog.json
 */
async function catalogsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const result = await client.catalogs.get("MyResourceGroup1", "MyCatalog1");
  console.log(result);
}

async function main() {
  await catalogsGet();
}

main().catch(console.error);
