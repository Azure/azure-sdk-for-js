// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a os image.
 *
 * @summary get a os image.
 * x-ms-original-file: 2025-12-01-preview/OsImages_Get_MaximumSet_Gen.json
 */
async function osImagesGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5233F7FA-C5BA-41FD-A07F-C65BA2084316";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.osImages.get("arowdcr", "10.2408.0.1");
  console.log(result);
}

async function main() {
  await osImagesGetMaximumSet();
}

main().catch(console.error);
