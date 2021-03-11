// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a ContainerRegistryClient.
 */

//import { ContainerRepositoryClient } from "@azure/container-registry";
import { ContainerRepositoryClient } from "../../../src";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  const endpoint = process.env.ENDPOINT ?? "<endpoint>";
  const repository = process.env.REPOSITORY_NAME ?? "<repository name>";

  const client = new ContainerRepositoryClient(endpoint, repository, new DefaultAzureCredential());
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
    }
    result = await pages.next();
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
