// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a ContainerRegistryClient.
 */

const { ContainerRegistryClient } = require("@azure/container-registry");
const { DefaultAzureCredential } = require("@azure/identity");

async function main() {
  const endpoint = process.env.ENDPOINT || "<endpoint>";

  const client = new ContainerRegistryClient(endpoint, new DefaultAzureCredential());

  const attributes = await client.getAttributes("repo_name");

  console.log("The value of registry:", attributes.registry);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
