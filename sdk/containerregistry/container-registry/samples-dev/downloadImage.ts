// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Downloads an image from the repository.
 * @azsdk-weight 3
 */

import {
  ContainerRegistryBlobClient,
  isDownloadOciImageManifestResult,
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
    new DefaultAzureCredential()
  );

  // Download the manifest to obtain the list of files in the image based on the tag
  const result = await client.downloadManifest("demo");

  // If an OCI image manifest was downloaded, it is available as a strongly typed object via the `manifest` property.
  if (!isDownloadOciImageManifestResult(result)) {
    throw new Error("Expected an OCI image manifest");
  }

  const manifest = result.manifest;
  // Manifests of all media types can be written to a file using the `content` stream.
  const manifestFile = fs.createWriteStream("manifest.json");
  result.content.pipe(manifestFile);

  const configResult = await client.downloadBlob(manifest.config.digest);
  const configFile = fs.createWriteStream("config.json");
  configResult.content.pipe(configFile);

  // Download and write out the layers
  for (const layer of manifest.layers) {
    const fileName = trimSha(layer.digest);
    const layerStream = fs.createWriteStream(fileName);
    const downloadLayerResult = await client.downloadBlob(layer.digest);
    downloadLayerResult.content.pipe(layerStream);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
