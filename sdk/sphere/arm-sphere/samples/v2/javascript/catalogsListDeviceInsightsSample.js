// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureSphereClient } = require("@azure/arm-sphere");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists device insights for catalog.
 *
 * @summary lists device insights for catalog.
 * x-ms-original-file: 2024-04-01/PostListDeviceInsightsCatalog.json
 */
async function catalogsListDeviceInsights() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.catalogs.listDeviceInsights("MyResourceGroup1", "MyCatalog1", {
    top: 10,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await catalogsListDeviceInsights();
}

main().catch(console.error);
