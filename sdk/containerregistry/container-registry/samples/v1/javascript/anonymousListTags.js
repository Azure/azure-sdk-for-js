// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Lists tags for an image in a registry that enables anonymous pull access.
 */

// A common use case for Azure Container Registries is to view the repositories, artifacts, or tags
// in a public registry that belongs to someone else. In this case, the user would need to access
// the registry anonymously. Anonymous access allows a user to list all the collections there, but
// they wouldn't have permissions to modify or delete any of the images in the registry.
const {
  ContainerRegistryClient,
  KnownContainerRegistryAudience
} = require("@azure/container-registry");
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  // Get the service endpoint from the environment
  const endpoint = process.env.CONTAINER_REGISTRY_ENDPOINT || "<endpoint>";

  // Create a new ContainerRegistryClient for anonymous access
  const client = new ContainerRegistryClient(endpoint, {
    audience: KnownContainerRegistryAudience.AzureResourceManagerPublicCloud
  });

  // Obtain a RegistryArtifact object to get access to image operations
  const image = client.getArtifact("library/hello-world", "latest");

  // List the set of tags on the hello_world image tagged as "latest"
  const tagIterator = image.listTagProperties();

  // Iterate through the image's tags, listing the tagged alias for the image
  console.log(`${image.fullyQualifiedReference}  has the following aliases:`);
  for await (const tag of tagIterator) {
    console.log(`  ${tag.registryLoginServer}/${tag.repositoryName}:${tag.name}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
