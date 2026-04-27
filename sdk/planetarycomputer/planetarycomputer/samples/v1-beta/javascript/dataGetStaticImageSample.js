// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to fetch an existing image export by ID
 *
 * @summary fetch an existing image export by ID
 * x-ms-original-file: 2025-04-30-preview/TilerStaticImages_Get.json
 */
async function tilerStaticImagesGet() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.getStaticImage(
    "naip-atl",
    "geocatalog-naip-atl-000000008a4c45329aecf476d560e8d3.png",
  );
  console.log(result);
}

async function main() {
  await tilerStaticImagesGet();
}

main().catch(console.error);
