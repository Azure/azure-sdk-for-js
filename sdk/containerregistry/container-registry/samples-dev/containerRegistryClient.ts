// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a ContainerRegistryClient.
 * @azsdk-weight 10
 */

import { ContainerRegistryClient } from "@azure/container-registry";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  // endpoint should be in the form of "https://myregistryname.azurecr.io"
  // where "myregistryname" is the actual name of your registry
  const endpoint = process.env.CONTAINERREGISTRY_REGISTRY_ENDPOINT || "<endpoint>";
  const client = new ContainerRegistryClient(endpoint, new DefaultAzureCredential());
  await listRepositories(client);

  // Advanced: listing by pages
  const pageSize = 2;
  await listRepositoriesByPages(client, pageSize);

  const repositoryName = "repository-name-to-delete";
  await deleteRepository(client, repositoryName);
}

async function listRepositories(client: ContainerRegistryClient) {
  console.log("Listing repositories");
  const iterator = client.listRepositories();
  for await (const repository of iterator) {
    console.log(`  repository: ${repository}`);
  }
}

async function listRepositoriesByPages(client: any, pageSize: number) {
  console.log("Listing repositories by pages");
  const pages = client.listRepositories().byPage({ maxPageSize: pageSize });
  let result = await pages.next();
  while (!result.done) {
    console.log("    -- page -- ");
    for (const repository of result.value) {
      console.log(`    repository: ${repository}`);
    }
    result = await pages.next();
  }
}

async function deleteRepository(client: ContainerRegistryClient, repositoryName: string) {
  console.log("Deleting a repository");
  const response = await client.deleteRepository(repositoryName);
  console.log(
    `Artifacts deleted: ${(response &&
      response.deletedRegistryArtifactDigests &&
      response.deletedRegistryArtifactDigests.length) ||
      0}`
  );
  console.log(
    `Tags deleted: ${(response &&
      response.deletedRegistryArtifactDigests &&
      response.deletedRegistryArtifactDigests.length) ||
      0}`
  );
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
