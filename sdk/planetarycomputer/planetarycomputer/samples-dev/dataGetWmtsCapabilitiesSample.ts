// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to oGC WMTS endpoint.
 *
 * @summary oGC WMTS endpoint.
 * x-ms-original-file: 2025-04-30-preview/TilerWmtsTileMatrixSets_GetCapabilitiesXml.json
 */
async function tilerWmtsTileMatrixSetsGetCapabilitiesXml(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.getWmtsCapabilities(
    "naip-atl",
    "ga_m_3308421_se_16_060_20211114",
    "WebMercatorQuad",
    {
      assets: ["image"],
      assetBandIndices: "image|1,2,3",
      tileFormat: "png",
      tileScale: 1,
      minZoom: 7,
      maxZoom: 14,
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tilerWmtsTileMatrixSetsGetCapabilitiesXml();
}

main().catch(console.error);
