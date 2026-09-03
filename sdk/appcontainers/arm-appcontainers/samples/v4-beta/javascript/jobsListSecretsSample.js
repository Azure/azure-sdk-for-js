// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list secrets for a container apps job
 *
 * @summary list secrets for a container apps job
 * x-ms-original-file: 2025-10-02-preview/Job_ListSecrets.json
 */
async function listContainerAppsJobSecrets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.jobs.listSecrets("rg", "testcontainerAppsJob0");
  console.log(result);
}

async function main() {
  await listContainerAppsJobSecrets();
}

main().catch(console.error);
