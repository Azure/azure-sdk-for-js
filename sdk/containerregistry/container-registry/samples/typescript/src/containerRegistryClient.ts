// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a ContainerRegistryClient.
 */

import { ContainerRegistryClient, ContainerRegistryUserCredential } from "../../../src";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  const endpoint = process.env.ENDPOINT ?? "<endpoint>";
  const user = process.env.USERNAME ?? "<username>";
  const pass = process.env.PASSWORD ?? "<password>";

  //const client = new ContainerRegistryClient(endpoint, new DefaultAzureCredential());
  const client = new ContainerRegistryClient(
    endpoint,
    new ContainerRegistryUserCredential(user, pass)
  );

  const attributes = await client.getRepositoryProperties("hello-world");

  console.log(`registry: ${attributes.registry}`);
  console.log(`image name: ${attributes.imageName}`);
  console.log(`created at: ${attributes.createdTime}`);
  console.log(`last updated at: ${attributes.lastUpdateTime}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
