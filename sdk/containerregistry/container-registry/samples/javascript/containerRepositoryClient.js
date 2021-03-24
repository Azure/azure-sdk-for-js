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
  await getProperties(client);
  await listTags(client);
  const artifacts = await listArtifacts(client);
  if (artifacts && artifacts.length) {
    const digest = artifacts[0].digest;
    await getArtifactProperties(client, digest);

    // uncomment the following line to delete the artifact
    // await deleteArtifact(client, digest);
  }
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
  const artifacts = [];
  const iterator = client.listRegistryArtifacts();
  for await (const artifact of iterator) {
    artifacts.push(artifact);
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

  return artifacts;
}

async function getProperties(client) {
  console.log("Retrieving repository properties...");
  const properties = await client.getProperties();
  console.log(`  name: ${properties.name}`);
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
  console.log(`Retrieving registry artifact properties for ${digest}`);
  const properties = await client.getRegistryArtifactProperties(digest);
  console.log(`  created on: ${properties.createdOn}`);
  console.log(`  last updated on: ${properties.lastUpdatedOn}`);
  console.log(`  arch : ${properties.cpuArchitecture}`);
  console.log(`  os : ${properties.operatingSystem}`);
  console.log(`  size : ${properties.size} bytes`);
}

async function deleteArtifact(client, digest) {
  console.log(`Deleting registry artifact for ${digest}`);
  await client.deleteRegistryArtifact(digest);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
