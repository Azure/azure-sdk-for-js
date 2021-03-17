// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a ContainerRegistryClient.
 */

import { ContainerRepositoryClient } from "@azure/container-registry";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  const endpoint = process.env.ENDPOINT ?? "<endpoint>";
  const repository = process.env.REPOSITORY_NAME ?? "<repository name>";

  const client = new ContainerRepositoryClient(endpoint, repository, new DefaultAzureCredential());
  await listTags(client);
  await listArtifacts(client);
  await getProperties(client);
  await getArtifactProperties(client);
}

async function listTags(client: ContainerRepositoryClient) {
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

async function listArtifacts(client: ContainerRepositoryClient) {
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

async function getProperties(client: ContainerRepositoryClient) {
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

async function getArtifactProperties(client: ContainerRepositoryClient) {
  const properties = await client.getRegistryArtifactProperties(
    "sha256%3A43abbf92155ae0e7067e9b619bd70d4e14f6bf6adef026d336f5aed3d4b5d6a7"
  );
  console.dir(properties);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
