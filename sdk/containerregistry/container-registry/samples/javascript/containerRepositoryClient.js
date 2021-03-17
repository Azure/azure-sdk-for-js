// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a ContainerRepositoryClient.
 */

const { ContainerRepositoryClient } = require("@azure/container-registry");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

async function main() {
  const endpoint = process.env.ENDPOINT || "<endpoint>";
  const repository = process.env.REPOSITORY_NAME || "<repository name>";

  const client = new ContainerRepositoryClient(endpoint, repository, new DefaultAzureCredential());
  await listTags(client);
  await listArtifacts(client);
  // await getProperties(client);
  const digest = "sha256:4661fb57f7890b9145907a1fe2555091d333ff3d28db86c3bb906f6a2be93c87";
  await getArtifactProperties(client, digest);
  // await deleteArtifact(client, digest);
}

async function listTags(client) {
  console.log("Listing tags");
  const iterator = client.listTags();
  for await (const tag of iterator) {
    console.log(`  tag: ${tag.name}`);
    console.log(`  digest: ${tag.digest}`);
    console.log(`  created on: ${tag.createdOn}`);
    console.log(`  last updated on: ${tag.lastUpdatedOn}`);
  }

  console.log("  by pages");
  const pages = client.listTags().byPage({ maxPageSize: 2 });
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

async function listArtifacts(client) {
  console.log("Listing artifacts");
  const iterator = client.listRegistryArtifacts();
  for await (const artifact of iterator) {
    console.log(`  digest: ${artifact.digest}`);
    console.log(`  created on: ${artifact.createdOn}`);
    console.log(`  last updated on: ${artifact.lastUpdatedOn}`);
  }

  console.log("  by pages");
  const pages = client.listRegistryArtifacts().byPage({ maxPageSize: 2 });
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

async function getProperties(client) {
  console.log("Retrieving repository properties...");
  const properties = await client.getProperties();
  console.log(`  name: ${properties.name}`);
  console.log(`  registry: ${properties.registry}`);
  console.log(`  created on: ${properties.createdOn}`);
  console.log(`  last updated on: ${properties.lastUpdatedOn}`);
  console.log(`  artifact count: ${properties.registryArtifactCount}`);
  console.log(`  tag count: ${properties.tagCount}`);
  const writableProps = properties.writeableProperties;
  if (writableProps) {
    console.log("  writable properties:");
    console.log(
      `      { canDelete: ${writableProps.canDelete}, canList: ${writableProps.canList}, canRead: ${writableProps.canRead}, canWrite: ${writableProps.canWrite}}`
    );
  }
}

async function getArtifactProperties(client, digest) {
  const properties = await client.getRegistryArtifactProperties(digest);
  console.dir(properties);
}

async function deleteArtifact(client, digest) {
  await client.deleteRegistryArtifact(digest);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
