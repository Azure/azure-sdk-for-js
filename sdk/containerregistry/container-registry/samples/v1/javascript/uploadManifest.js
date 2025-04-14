// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Uploads a manifest to a repository.
 */

const { ContainerRegistryContentClient } = require("@azure/container-registry");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

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
    }),
  );

  const { digest: configDigest, sizeInBytes: configSize } = await client.uploadBlob(config);

  const manifest = {
    schemaVersion: 2,
    config: {
      mediaType: "application/vnd.oci.image.config.v1+json",
      digest: configDigest,
      size: configSize,
    },
    layers: [
      {
        mediaType: "application/vnd.oci.image.layer.v1.tar",
        digest: layerDigest,
        size: layerSize,
        annotations: {
          "org.opencontainers.image.title": "artifact.txt",
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
