// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Uploads a manifest to a repository.
 */

const {
  ContainerRegistryBlobClient,
  KnownContainerRegistryAudience,
} = require("@azure/container-registry");
const { DefaultAzureCredential } = require("@azure/identity");
const dotenv = require("dotenv");
const { Readable } = require("stream");
dotenv.config();

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

  const layer = Buffer.from("Hello, world");
  const { digest: layerDigest } = await client.uploadBlob(Readable.from(layer));

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

  const { digest: configDigest } = await client.uploadBlob(Readable.from(config));

  const manifest = {
    schemaVersion: 2,
    config: {
      mediaType: "application/vnd.oci.image.config.v1+json",
      digest: configDigest,
      size: config.byteLength,
    },
    layers: [
      {
        mediaType: "application/vnd.oci.image.layer.v1.tar",
        digest: layerDigest,
        size: layer.byteLength,
        annotations: {
          title: "artifact.txt",
        },
      },
    ],
  };

  // A manifest can be given a tag when uploading.
  await client.uploadManifest(manifest, { tag: "1.0.0" });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
