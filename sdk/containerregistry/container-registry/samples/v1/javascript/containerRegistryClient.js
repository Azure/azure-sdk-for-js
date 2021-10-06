// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Lists repository names and deletes a repository.
 */

const {
  ContainerRegistryClient,
  KnownContainerRegistryAudience
} = require("@azure/container-registry");
const { DefaultAzureCredential } = require("@azure/identity");
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  // endpoint should be in the form of "https://myregistryname.azurecr.io"
  // where "myregistryname" is the actual name of your registry
  const endpoint = process.env.CONTAINER_REGISTRY_ENDPOINT || "<endpoint>";
  const client = new ContainerRegistryClient(endpoint, new DefaultAzureCredential(), {
    audience: KnownContainerRegistryAudience.AzureResourceManagerPublicCloud
  });
  await listRepositoryNames(client);

  // Advanced: listing by pages
  const pageSize = 1;
  await listRepositoryNamesByPages(client, pageSize);

  const repositoryName = "repository-name-to-delete";
  await deleteRepository(client, repositoryName);
}

async function listRepositoryNames(client) {
  console.log("Listing repositories");
  const iterator = client.listRepositoryNames();
  for await (const repository of iterator) {
    console.log(`  repository: ${repository}`);
  }
}

async function listRepositoryNamesByPages(client, pageSize) {
  console.log("Listing repositories by pages");
  const pages = client.listRepositoryNames().byPage({ maxPageSize: pageSize });
  let result = await pages.next();
  while (!result.done) {
    console.log("    -- page -- ");
    for (const repository of result.value) {
      console.log(`    repository: ${repository}`);
    }
    result = await pages.next();
  }
}

async function deleteRepository(client, repositoryName) {
  console.log("Deleting a repository");
  await client.deleteRepository(repositoryName);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
