// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Uploads a manifest with custom manifest type, in this case a manifest list.
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

  const mediaType = "application/vnd.docker.distribution.manifest.list.v2+json";

  // In this sample, we define the manifest inline as a JavaScript object.
  // If the manifest you wish to upload exists as a file on disk, you can pass
  // a ReadableStream of the file into uploadManifest instead.
  const manifest = {
    schemaVersion: 2,
    mediaType,
    manifests: [
      {
        mediaType: "application/vnd.docker.distribution.manifest.v2+json",
        digest: "sha256:e692418e4cbaf90ca69d05a66403747baa33ee08806650b51fab815ad7fc331f",
        size: 7143,
        platform: {
          architecture: "ppc64le",
          os: "linux",
        },
      },
      {
        mediaType: "application/vnd.docker.distribution.manifest.v2+json",
        digest: "sha256:5b0bcabd1ed22e9fb1310cf6c2dec7cdef19f0ad69efa1f392e94a4333501270",
        size: 7682,
        platform: {
          architecture: "amd64",
          os: "linux",
          features: ["sse4"],
        },
      },
    ],
  };

  await client.setManifest(manifest, { mediaType });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
