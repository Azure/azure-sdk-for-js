// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a ContainerRepositoryClient.
 */

//const { ContainerRepositoryClient } = require("@azure/container-registry");
const { ContainerRepositoryClient, ContainerRegistryUserCredential } = require("../../dist");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

async function main() {
  const endpoint = process.env.ENDPOINT || "<endpoint>";
  const repository = process.env.REPOSITORY_NAME || "<repository name>";

  //const client = new ContainerRepositoryClient(endpoint, repository, new DefaultAzureCredential());
  const client = new ContainerRepositoryClient(
    endpoint,
    repository,
    new ContainerRegistryUserCredential(process.env.USERNAME, process.env.PASSWORD)
  );

  // console.log("Listing tags using for-await-of syntax");
  // const iterator = client.listTags();
  // for await (const tag of iterator) {
  //   console.log(`  tag: ${tag.name}`);
  //   console.log(`  digest: ${tag.digest}`);
  //   console.log(`  created on: ${tag.createdOn}`);
  //   console.log(`  last updated on: ${tag.lastUpdatedOn}`);
  // }
  console.log("  by pages");
  const pages = client.listTags().byPage({ maxPageSize: 2 });
  let result = await pages.next();
  while (!result.done) {
    console.log("    -- page -- ");
    for (const tag of result.value) {
      console.log(`      tag: ${tag.name}`);
      console.log(`      digest: ${tag.digest}`);
      console.log(`      created on: ${tag.createdOn}`);
      console.log(`      last updated on: ${tag.lastUpdatedOn}`);
    }
    result = await pages.next();
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
