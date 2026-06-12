// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a collection asset.
 *
 * @summary create a collection asset.
 */
const { DefaultAzureCredential } = require("@azure/identity");
const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");

async function main() {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const result = await client.stac.createCollectionAsset(collectionId, {
    data: {
      key: "my-asset",
      href: "https://example.com/asset.tif",
      type: "image/tiff",
      roles: ["data"],
      title: "My Asset",
    },
    file: new Blob(["asset content"], { type: "application/octet-stream" }),
  });
  console.log(result);
}

main().catch(console.error);
