// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a ContainerRegistryClient.
 */

import { ContainerRegistryClient } from "@azure/container-registry";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  const endpoint = process.env.ENDPOINT ?? "<endpoint>";
  const client = new ContainerRegistryClient(endpoint, new DefaultAzureCredential());
  await listRepositories(client);
  await deleteRepository(client);
}

async function listRepositories(client: ContainerRegistryClient) {
  console.log("Listing repositories");
  const iterator = client.listRepositories();
  for await (const repository of iterator) {
    console.log(`  repository: ${repository}`);
  }

  console.log("  by pages");
  const pages = client.listRepositories().byPage({ maxPageSize: 2 });
  let result = await pages.next();
  while (!result.done) {
    console.log("    -- page -- ");
    for (const repository of result.value) {
      console.log(`    repository: ${repository}`);
    }
    result = await pages.next();
  }
}

async function deleteRepository(client: ContainerRegistryClient) {
  const response = await client.deleteRepository("hello-world");
  console.log(`Artifacts deleted: ${response?.deletedRegistryArtifactDigests?.length ?? 0}`);
  console.log(`Tags deleted: ${response?.deletedRegistryArtifactDigests?.length ?? 0}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
