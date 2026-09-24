// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a SandboxGroup.
 *
 * @summary create or update a SandboxGroup.
 * x-ms-original-file: 2026-07-01/SandboxGroups_CreateOrUpdate.json
 */
async function createOrUpdateASandboxGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.sandboxGroups.createOrUpdate("examplerg", "testgroup", {
    location: "East US",
  });
  console.log(result);
}

async function main() {
  await createOrUpdateASandboxGroup();
}

main().catch(console.error);
