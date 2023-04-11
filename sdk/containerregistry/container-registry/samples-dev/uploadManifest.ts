// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Uploads a manifest to a repository.
 * @azsdk-weight 3
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
    new DefaultAzureCredential()
  );

  const layer = Buffer.from("Hello, world");
  const { digest: layerDigest, sizeInBytes: layerSize } = await client.uploadBlob(layer);

  const config = Buffer.from(
    JSON.stringify({
      architecture: "amd64",
      os: "windows",
      rootfs: {
        type: "layers",
        diff_ids: [layerDigest],
      },
    })
  );

  const { digest: configDigest, sizeInBytes: configSize } = await client.uploadBlob(config);

  const manifest: OciImageManifest = {
    schemaVersion: 2,
    configuration: {
      mediaType: "application/vnd.oci.image.config.v1+json",
      digest: configDigest,
      sizeInBytes: configSize,
    },
    layers: [
      {
        mediaType: "application/vnd.oci.image.layer.v1.tar",
        digest: layerDigest,
        sizeInBytes: layerSize,
        annotations: {
          title: "artifact.txt",
        },
      },
    ],
  };

  // A manifest can be given a tag when uploading.
  await client.setManifest(manifest, { tag: "1.0.0" });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
