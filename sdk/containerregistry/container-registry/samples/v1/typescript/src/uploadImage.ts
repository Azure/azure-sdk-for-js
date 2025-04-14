// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Uploads an image to the repository.
 */

import { ContainerRegistryContentClient, OciImageManifest } from "@azure/container-registry";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  // endpoint should be in the form of "https://myregistryname.azurecr.io"
  // where "myregistryname" is the actual name of your registry
  const endpoint = process.env.CONTAINER_REGISTRY_ENDPOINT || "<endpoint>";
  const repository = process.env.CONTAINER_REGISTRY_REPOSITORY || "library/hello-world";
  const client = new ContainerRegistryContentClient(
    endpoint,
    repository,
    new DefaultAzureCredential(),
  );

  const config = Buffer.from("Sample config");
  const { digest: configDigest, sizeInBytes: configSize } = await client.uploadBlob(config);

  const layer = Buffer.from("Sample layer");
  const { digest: layerDigest, sizeInBytes: layerSize } = await client.uploadBlob(layer);

  const manifest: OciImageManifest = {
    schemaVersion: 2,
    config: {
      digest: configDigest,
      size: configSize,
      mediaType: "application/vnd.oci.image.config.v1+json",
    },
    layers: [
      {
        digest: layerDigest,
        size: layerSize,
        mediaType: "application/vnd.oci.image.layer.v1.tar",
      },
    ],
  };

  await client.setManifest(manifest, { tag: "demo" });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
