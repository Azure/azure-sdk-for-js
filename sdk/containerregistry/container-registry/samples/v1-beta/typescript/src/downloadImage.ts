// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Downloads an image from the repository.
 */

import {
  ContainerRegistryBlobClient,
  KnownContainerRegistryAudience,
} from "@azure/container-registry";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";
import fs from "fs";
dotenv.config();

function trimSha(digest: string) {
  const index = digest.indexOf(":");
  return index === -1 ? digest : digest.substring(index);
}

async function main() {
  // endpoint should be in the form of "https://myregistryname.azurecr.io"
  // where "myregistryname" is the actual name of your registry
  const endpoint = process.env.CONTAINER_REGISTRY_ENDPOINT || "<endpoint>";
  const repository = process.env.CONTAINER_REGISTRY_REPOSITORY || "library/hello-world";
  const client = new ContainerRegistryBlobClient(
    endpoint,
    repository,
    new DefaultAzureCredential(),
    {
      audience: KnownContainerRegistryAudience.AzureResourceManagerPublicCloud,
    }
  );

  // Download the manifest to obtain the list of files in the image based on the tag
  const result = await client.downloadManifest("demo");

  // The manifest is available as a strongly typed object, but can also be saved to a file.
  const manifest = result.manifest;
  const manifestFile = fs.createWriteStream("manifest.json");
  result.manifestStream.pipe(manifestFile);

  const configResult = await client.downloadBlob(manifest.config!.digest);
  const configFile = fs.createWriteStream("config.json");
  configResult.content.pipe(configFile);

  // Download and write out the layers
  for (const layer of manifest.layers!) {
    const fileName = trimSha(layer.digest);
    const layerStream = fs.createWriteStream(fileName);
    const downloadLayerResult = await client.downloadBlob(layer.digest);
    downloadLayerResult.content.pipe(layerStream);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
