// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Deletes all but the latest three images.
 */

// A common use case for Azure Container Registries is to scan the repositories
// in a registry and delete all but the most recent n images, or all images
// older than a certain date.
import { ContainerRegistryClient, KnownContainerRegistryAudience } from "@azure/container-registry";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  // Get the service endpoint from the environment
  const endpoint = process.env.CONTAINER_REGISTRY_ENDPOINT || "<endpoint>";
  // Create a new ContainerRegistryClient
  const client = new ContainerRegistryClient(endpoint, new DefaultAzureCredential(), {
    audience: KnownContainerRegistryAudience.AzureResourceManagerPublicCloud,
  });

  // Iterate through repositories
  const repositoryNames = client.listRepositoryNames();
  for await (const repositoryName of repositoryNames) {
    const repository = client.getRepository(repositoryName);
    // Obtain the images ordered from newest to oldest
    const imageManifests = repository.listManifestProperties({
      order: "LastUpdatedOnDescending",
    });
    const imagesToKeep = 3;
    let imageCount = 0;
    // Delete images older than the first three.
    for await (const manifest of imageManifests) {
      imageCount++;
      if (imageCount > imagesToKeep) {
        const image = repository.getArtifact(manifest.digest);
        console.log(`Deleting image with digest ${manifest.digest}`);
        console.log(`  Deleting the following tags from the image:`);
        for (const tagName of manifest.tags) {
          console.log(`    ${manifest.repositoryName}:${tagName}`);
          image.deleteTag(tagName);
        }
        await image.delete();
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
