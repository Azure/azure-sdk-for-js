// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patches a Managed Environment using JSON Merge Patch
 *
 * @summary patches a Managed Environment using JSON Merge Patch
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironments_Patch.json
 */
async function patchManagedEnvironment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.managedEnvironments.update("examplerg", "testcontainerenv", {
    location: "East US",
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main() {
  await patchManagedEnvironment();
}

main().catch(console.error);
