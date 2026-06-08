// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to replace a collection asset.
 *
 * @summary replace a collection asset.
 */
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const result = await client.stac.replaceCollectionAsset(collectionId, "my-asset", {
    data: {
      key: "my-asset",
      href: "https://example.com/asset-v2.tif",
      type: "image/tiff",
      roles: ["data"],
      title: "Updated Asset",
    },
    file: new Blob(["updated content"], { type: "application/octet-stream" }),
  });
  console.log(result);
}

main().catch(console.error);
