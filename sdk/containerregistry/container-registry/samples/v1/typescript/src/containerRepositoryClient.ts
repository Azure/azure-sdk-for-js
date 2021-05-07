// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a ContainerRepositoryClient.
 */

import { ContainerRepositoryClient, RegistryArtifactProperties } from "@azure/container-registry";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  // endpoint should be in the form of "https://myregistryname.azurecr.io"
  // where "myregistryname" is the actual name of your registry
  const endpoint = process.env.CONTAINERREGISTRY_REGISTRY_ENDPOINT || "<endpoint>";
  const repository = process.env.REPOSITORY_NAME || "<repository name>";

  const client = new ContainerRepositoryClient(endpoint, repository, new DefaultAzureCredential());
  await getProperties(client);
  await listTags(client);

  const artifacts = await listArtifacts(client);

  if (artifacts && artifacts.length) {
    const digest = artifacts[0].digest;
    if (digest) {
      await getArtifactProperties(client, digest);

      await deleteArtifact(client, digest);
    }
  }

  // Advanced: listing by pages
  const pageSize = 2;
  await listTagsByPages(client, pageSize);
  await listArtifactsByPages(client, pageSize);
}

async function listTags(client: ContainerRepositoryClient) {
  console.log("Listing tags");
  const iterator = client.listTags({ orderBy: "timeasc" });
  for await (const tag of iterator) {
    console.log(`  tag: ${tag.name}`);
    console.log(`  digest: ${tag.digest}`);
    console.log(`  created on: ${tag.createdOn}`);
    console.log(`  last updated on: ${tag.lastUpdatedOn}`);
  }
}

async function listTagsByPages(client: ContainerRepositoryClient, pagesSize: number) {
  console.log("Listing tags by pages");
  const pages = client.listTags().byPage({ maxPageSize: pagesSize });
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

async function listArtifacts(
  client: ContainerRepositoryClient
): Promise<RegistryArtifactProperties[]> {
  console.log("Listing artifacts");
  const artifacts: RegistryArtifactProperties[] = [];
  const iterator = client.listRegistryArtifacts();
  for await (const artifact of iterator) {
    artifacts.push(artifact);
    console.log(`  digest: ${artifact.digest}`);
    console.log(`  created on: ${artifact.createdOn}`);
    console.log(`  last updated on: ${artifact.lastUpdatedOn}`);
  }

  return artifacts;
}

async function listArtifactsByPages(client: any, pageSize: number) {
  console.log("Listing artifacts by pages");
  const pages = client.listRegistryArtifacts().byPage({ maxPageSize: pageSize });
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

async function getArtifactProperties(client: ContainerRepositoryClient, digest: string) {
  console.log(`Retrieving registry artifact properties for ${digest}`);
  const properties = await client.getRegistryArtifactProperties(digest);
  console.log(`  created on: ${properties.createdOn}`);
  console.log(`  last updated on: ${properties.lastUpdatedOn}`);
  console.log(`  arch : ${properties.cpuArchitecture}`);
  console.log(`  os : ${properties.operatingSystem}`);
  console.log(`  size : ${properties.size} bytes`);
}

async function deleteArtifact(client: ContainerRepositoryClient, digest: string) {
  console.log(`Deleting registry artifact for ${digest}`);
  await client.deleteRegistryArtifact(digest);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
