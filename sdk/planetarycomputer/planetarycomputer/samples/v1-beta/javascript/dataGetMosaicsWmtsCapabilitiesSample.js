// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to oGC WMTS endpoint.
 *
 * @summary oGC WMTS endpoint.
 * x-ms-original-file: 2025-04-30-preview/MosaicsWmtsMosaicsTileMatrixSets_GetCapabilitiesXml.json
 */
async function mosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXml() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.getMosaicsWmtsCapabilities(
    "ba13fc7947b9b585690d84ee61aaa653",
    "WebMercatorQuad",
    {
      assets: ["image"],
      assetBandIndices: "image|1,2,3",
      tileFormat: "png",
      tileScale: 1,
      minZoom: 7,
      maxZoom: 13,
    },
  );
  console.log(result);
}

async function main() {
  await mosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXml();
}

main().catch(console.error);
