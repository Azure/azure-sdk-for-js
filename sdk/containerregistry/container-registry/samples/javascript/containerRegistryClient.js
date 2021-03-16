// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a ContainerRegistryClient.
 */

const { ContainerRegistryClient } = require("@azure/container-registry");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

async function main() {
  const endpoint = process.env.ENDPOINT ?? "<endpoint>";

  const client = new ContainerRegistryClient(endpoint, new DefaultAzureCredential());
  const response = await client.deleteRepository("hello-world");
  console.log(
    `Number of artifacts deleted: ${response?.deletedRegistryArtifactDigests?.length || 0}`
  );
  console.log(`Number of tags deleted: ${response?.deletedRegistryArtifactDigests?.length || 0}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
