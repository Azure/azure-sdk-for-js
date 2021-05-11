// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of ContainerRepository and RegistryArtifact.
 */

const { ContainerRegistryClient } = require("@azure/container-registry");
const { DefaultAzureCredential } = require("@azure/identity");
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  // endpoint should be in the form of "https://myregistryname.azurecr.io"
  // where "myregistryname" is the actual name of your registry
  const endpoint = process.env.CONTAINERREGISTRY_REGISTRY_ENDPOINT || "<endpoint>";
  const repositoryName = process.env.REPOSITORY_NAME || "<repository name>";
  const pageSize = 1;

  const client = new ContainerRegistryClient(endpoint, new DefaultAzureCredential());
  const repository = client.getRepository(repositoryName);
  await getProperties(repository);

  const manifests = await listManifests(repository);

  if (manifests && manifests.length) {
    const digest = manifests[0].digest;
    if (digest) {
      const artifact = repository.getArtifact(digest);

      console.log(`Retrieving registry artifact properties for ${digest}`);
      await getArtifactProperties(artifact);

      console.log(`Listing tags for ${digest}`);
      await listTags(artifact);

      // Advanced: listing by pages
      console.log(`Listing tags by pages for ${digest}`);
      await listTagsByPages(artifact, pageSize);

      console.log(`Deleting registry artifact for ${digest}`);
      await artifact.delete();
    }
  }
  // Advanced: listing by pages
  await listManifestsByPages(repository, pageSize);
}

async function listTags(artifact) {
  const iterator = artifact.listTags({ orderBy: "timeAsc" });
  for await (const tag of iterator) {
    console.log(`  tag: ${tag.name}`);
    console.log(`  digest: ${tag.digest}`);
    console.log(`  created on: ${tag.createdOn}`);
    console.log(`  last updated on: ${tag.lastUpdatedOn}`);
  }
}

async function listTagsByPages(artifact, pagesSize) {
  const pages = artifact.listTags().byPage({ maxPageSize: pagesSize });
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

async function listManifests(repository) {
  console.log("Listing artifacts");
  const artifacts = [];
  const iterator = repository.listManifests();
  for await (const artifact of iterator) {
    artifacts.push(artifact);
    console.log(`  digest: ${artifact.digest}`);
    console.log(`  created on: ${artifact.createdOn}`);
    console.log(`  last updated on: ${artifact.lastUpdatedOn}`);
  }

  return artifacts;
}

async function listManifestsByPages(repository, pageSize) {
  console.log("Listing manifest by pages");
  const pages = repository.listManifests().byPage({ maxPageSize: pageSize });
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

async function getProperties(repository) {
  console.log("Retrieving repository properties...");
  const properties = await repository.getProperties();
  console.log(`  name: ${properties.name}`);
  console.log(`  created on: ${properties.createdOn}`);
  console.log(`  last updated on: ${properties.lastUpdatedOn}`);
  console.log(`  artifact count: ${properties.manifestCount}`);
  console.log(`  tag count: ${properties.tagCount}`);
  const writableProps = properties.writeableProperties;
  if (writableProps) {
    console.log("  writable properties: {");
    console.log(`    canDelete: ${writableProps.canDelete},
    canList: ${writableProps.canList},
    canRead: ${writableProps.canRead},
    canWrite: ${writableProps.canWrite}`);
    console.log("  }");
  }
}

async function getArtifactProperties(artifact) {
  const properties = await artifact.getManifestProperties();
  console.log(`  created on: ${properties.createdOn}`);
  console.log(`  last updated on: ${properties.lastUpdatedOn}`);
  console.log(`  arch : ${properties.architecture}`);
  console.log(`  os : ${properties.operatingSystem}`);
  console.log(`  size : ${properties.size} bytes`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
