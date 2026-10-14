// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureSphereClient } = require("@azure/arm-sphere");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Image
 *
 * @summary delete a Image
 * x-ms-original-file: 2024-04-01/DeleteImage.json
 */
async function imagesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  await client.images.delete(
    "MyResourceGroup1",
    "MyCatalog1",
    "00000000-0000-0000-0000-000000000000",
  );
}

async function main() {
  await imagesDelete();
}

main().catch(console.error);
