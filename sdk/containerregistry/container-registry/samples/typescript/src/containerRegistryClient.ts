// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a ContainerRegistryClient.
 */

import { ContainerRegistryClient } from "@azure/container-registry";
import { DefaultAzureCredential } from "@azure/identity";

export async function main() {
  const endpoint = process.env.ENDPOINT ?? "<endpoint>";

  const client = new ContainerRegistryClient(endpoint, new DefaultAzureCredential());

  const attributes = await client.getAttributes("repo_name");

  console.log("The value of registry:", attributes.registry);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
