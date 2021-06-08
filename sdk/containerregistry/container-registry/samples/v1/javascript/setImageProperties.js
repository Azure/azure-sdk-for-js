// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Updates the properties on the tag so it can't be overwritten or deleted.
 */

// This sample assumes the registry has a repository `hello-world` with image tagged `v1`.

const { ContainerRegistryClient } = require("@azure/container-registry");
const { DefaultAzureCredential } = require("@azure/identity");
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  // Get the service endpoint from the environment
  const endpoint = process.env.CONTAINER_REGISTRY_ENDPOINT || "<endpoint>";
  // Create a new ContainerRegistryClient
  const client = new ContainerRegistryClient(endpoint, new DefaultAzureCredential());
  const image = client.getArtifact("library/hello-world", "latest");
  await image.updateTagProperties("v1", {
    canWrite: false,
    canDelete: false
  });
  // After this update, if someone were to push an update to `<registry endpoint>\hello-world:v1`, it would fail.
  // It's worth noting that if this image also had another tag, such as `latest`, and that tag did not have
  // permissions set to prevent reads or deletes, the image could still be overwritten. For example,
  // if someone were to push an update to `<registry endpoint>\hello-world:latest`
  // (which references the same image), it would succeed.
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
