// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create preview of a dataset.
 *
 * @summary create preview of a dataset.
 * x-ms-original-file: 2025-04-30-preview/TilerPreviews_Get.json
 */
async function tilerPreviewsGet() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.getPreview("naip-atl", "ga_m_3308421_se_16_060_20211114", {
    assets: ["image"],
    assetBandIndices: "image|1,2,3",
    format: "png",
    height: 512,
    width: 512,
  });
  console.log(result);
}

async function main() {
  await tilerPreviewsGet();
}

main().catch(console.error);
