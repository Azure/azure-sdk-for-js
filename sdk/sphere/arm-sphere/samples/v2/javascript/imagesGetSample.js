// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureSphereClient } = require("@azure/arm-sphere");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Image
 *
 * @summary get a Image
 * x-ms-original-file: 2024-04-01/GetImage.json
 */
async function imagesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const result = await client.images.get(
    "MyResourceGroup1",
    "MyCatalog1",
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main() {
  await imagesGet();
}

main().catch(console.error);
