// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Uses ContainerRepository and RegistryArtifact to work with manifests, tags, and artifacts.
 * @azsdk-weight 5
 */

import {
  ContainerRepository,
  ArtifactManifestProperties,
  ContainerRegistryClient,
  RegistryArtifact,
  KnownContainerRegistryAudience,
} from "@azure/container-registry";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  // endpoint should be in the form of "https://myregistryname.azurecr.io"
  // where "myregistryname" is the actual name of your registry
  const endpoint = process.env.CONTAINER_REGISTRY_ENDPOINT || "<endpoint>";
  const repositoryName = process.env.REPOSITORY_NAME || "<repository name>";
  const pageSize = 1;

  const client = new ContainerRegistryClient(endpoint, new DefaultAzureCredential(), {
    audience: KnownContainerRegistryAudience.AzureResourceManagerPublicCloud,
  });
  const repository = client.getRepository(repositoryName);
  await getProperties(repository);

  const manifests = await listManifestProperties(repository);

  // Advanced: listing by pages
  await listManifestPropertiesByPages(repository, pageSize);

  if (manifests && manifests.length) {
    const digest = manifests[0].digest;
    if (digest) {
      const artifact = repository.getArtifact(digest);

      console.log(`Retrieving registry artifact properties for ${digest}`);
      await getArtifactProperties(artifact);

      console.log(`Listing tags for ${digest}`);
      const tags = await listTagProperties(artifact);
      if (tags && tags.length) {
        console.log(`Retrieving tag properties for ${tags[0]}`);
        const tagProperties = await artifact.getTagProperties(tags[0]);
        console.log(`  tag properties`);
        console.log(tagProperties);
      }

      // Advanced: listing by pages
      console.log(`Listing tags by pages for ${digest}`);
      await listTagPropertiesByPages(artifact, pageSize);

      console.log(`Deleting registry artifact for ${digest}`);
      await artifact.delete();
    }
  }
}

async function listTagProperties(artifact: RegistryArtifact): Promise<string[]> {
  const tags: string[] = [];
  // Obtain the tags ordered from newest to oldest by passing the `orderBy` option
  const iterator = artifact.listTagProperties({ order: "LastUpdatedOnAscending" });
  for await (const tag of iterator) {
    tags.push(tag.name);
    console.log(`  registry login server: ${tag.registryLoginServer}`);
    console.log(`  tag: ${tag.name}`);
    console.log(`  digest: ${tag.digest}`);
    console.log(`  created on: ${tag.createdOn}`);
    console.log(`  last updated on: ${tag.lastUpdatedOn}`);
  }

  return tags;
}

async function listTagPropertiesByPages(artifact: RegistryArtifact, pagesSize: number) {
  const pages = artifact.listTagProperties().byPage({ maxPageSize: pagesSize });
  let result = await pages.next();
  while (!result.done) {
    console.log("    -- page -- ");
    for (const tag of result.value) {
      console.log(`    tag: ${tag.name}`);
      console.log(`    digest: ${tag.digest}`);
      console.log(`    created on: ${tag.createdOn}`);
      console.log(`    last updated on: ${tag.lastUpdatedOn}`);
      console.log("");
    }
    result = await pages.next();
  }
}

async function listManifestProperties(
  repository: ContainerRepository
): Promise<ArtifactManifestProperties[]> {
  console.log("Listing artifacts");
  const artifacts: ArtifactManifestProperties[] = [];
  const iterator = repository.listManifestProperties();
  for await (const artifact of iterator) {
    artifacts.push(artifact);
    console.log(`  registry login server: ${artifact.registryLoginServer}`);
    console.log(`  digest: ${artifact.digest}`);
    console.log(`  created on: ${artifact.createdOn}`);
    console.log(`  last updated on: ${artifact.lastUpdatedOn}`);
  }

  return artifacts;
}

async function listManifestPropertiesByPages(repository: ContainerRepository, pageSize: number) {
  console.log("Listing manifest by pages");
  const pages = repository.listManifestProperties().byPage({ maxPageSize: pageSize });
  let result = await pages.next();
  while (!result.done) {
    console.log("    -- page -- ");
    for (const artifact of result.value) {
      console.log(`    digest: ${artifact.digest}`);
      console.log(`    created on: ${artifact.createdOn}`);
      console.log(`    last updated on: ${artifact.lastUpdatedOn}`);
      console.log("");
    }
    result = await pages.next();
  }
}

async function getProperties(repository: ContainerRepository) {
  console.log("Retrieving repository properties...");
  const properties = await repository.getProperties();
  console.log(`  registry login server: ${properties.registryLoginServer}`);
  console.log(`  name: ${properties.name}`);
  console.log(`  created on: ${properties.createdOn}`);
  console.log(`  last updated on: ${properties.lastUpdatedOn}`);
  console.log(`  artifact count: ${properties.manifestCount}`);
  console.log(`  tag count: ${properties.tagCount}`);
  console.log("  writable properties: {");
  console.log(
    `    canDelete: ${properties.canDelete},
    canList: ${properties.canList},
    canRead: ${properties.canRead},
    canWrite: ${properties.canWrite}`
  );
  console.log("  }");
}

async function getArtifactProperties(artifact: RegistryArtifact) {
  const properties = await artifact.getManifestProperties();
  console.log(`  registry login server: ${properties.registryLoginServer}`);
  console.log(`  created on: ${properties.createdOn}`);
  console.log(`  last updated on: ${properties.lastUpdatedOn}`);
  console.log(`  arch : ${properties.architecture}`);
  console.log(`  os : ${properties.operatingSystem}`);
  console.log(`  size : ${properties.sizeInBytes} bytes`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
