// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SpatioClient } = require("@azure/arm-planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a GeoCatalog
 *
 * @summary get a GeoCatalog
 * x-ms-original-file: 2025-02-11-preview/GeoCatalogs_Get.json
 */
async function geoCatalogsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "cd9b6cdf-dcf0-4dca-ab19-82be07b74704";
  const client = new SpatioClient(credential, subscriptionId);
  const result = await client.geoCatalogs.get("MyResourceGroup", "MyCatalog");
  console.log(result);
}

async function main() {
  await geoCatalogsGet();
}

main().catch(console.error);
