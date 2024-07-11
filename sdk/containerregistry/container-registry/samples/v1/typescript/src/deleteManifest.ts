// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Deletes a given manifest from the repository.
 */

import { ContainerRegistryContentClient } from "@azure/container-registry";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  // Get the service endpoint from the environment
  const endpoint = process.env.CONTAINER_REGISTRY_ENDPOINT || "<endpoint>";
  const repository = process.env.CONTAINER_REGISTRY_REPOSITORY || "library/hello-world";
  // Create a new ContainerRegistryClient
  const client = new ContainerRegistryContentClient(
    endpoint,
    repository,
    new DefaultAzureCredential(),
  );

  const downloadResult = await client.getManifest("latest");
  await client.deleteManifest(downloadResult.digest);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
