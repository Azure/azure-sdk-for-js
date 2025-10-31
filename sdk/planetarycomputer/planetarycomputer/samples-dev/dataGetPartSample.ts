// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create image from part of a dataset.
 *
 * @summary create image from part of a dataset.
 * x-ms-original-file: 2025-04-30-preview/TilerParts_GetCroppedToBoundingBox.json
 */
async function tilerPartsGetCroppedToBoundingBox(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.getPart(
    "naip-atl",
    "ga_m_3308421_se_16_060_20211114",
    -84.393,
    33.6798,
    -84.367,
    33.7058,
    "png",
    { assets: ["image"], assetBandIndices: "image|1,2,3" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tilerPartsGetCroppedToBoundingBox();
}

main().catch(console.error);
