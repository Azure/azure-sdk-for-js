// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Managed Environment if it does not have any container apps.
 *
 * @summary delete a Managed Environment if it does not have any container apps.
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironments_Delete.json
 */
async function deleteEnvironmentByName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.managedEnvironments.delete("examplerg", "examplekenv");
}

async function main() {
  await deleteEnvironmentByName();
}

main().catch(console.error);
