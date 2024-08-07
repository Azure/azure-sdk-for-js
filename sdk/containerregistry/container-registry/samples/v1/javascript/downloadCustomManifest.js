// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Downloads a manifest which may be of varying media type.
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

  const manifestListType = "application/vnd.docker.distribution.manifest.list.v2+json";
  const ociIndexType = "application/vnd.oci.image.index.v1+json";

  const result = await client.getManifest("latest");

  if (result.mediaType === manifestListType) {
    console.log("Manifest is a Docker manifest list");
  } else if (result.mediaType === ociIndexType) {
    console.log("Manifest is an OCI index");
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
