// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Downloads an image from the repository.
 * @azsdk-weight 3
 */

import {
  ContainerRegistryContentClient,
  isGetOciImageManifestResult,
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
  const client = new ContainerRegistryContentClient(
    endpoint,
    repository,
    new DefaultAzureCredential()
  );

  // Download the manifest to obtain the list of files in the image based on the tag
  const result = await client.getManifest("demo");

  // If an OCI image manifest was downloaded, it is available as a strongly typed object via the `manifest` property.
  if (!isGetOciImageManifestResult(result)) {
    throw new Error("Expected an OCI image manifest");
  }

  const manifest = result.manifest;
  // Manifests of all media types have a buffer containing their content; this can be written to a file.
  fs.writeFileSync("manifest.json", result.content);

  const configResult = await client.downloadBlob(manifest.configuration.digest);
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
