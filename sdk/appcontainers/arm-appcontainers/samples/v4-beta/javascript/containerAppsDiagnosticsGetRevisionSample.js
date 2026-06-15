// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a revision of a Container App.
 *
 * @summary get a revision of a Container App.
 * x-ms-original-file: 2025-10-02-preview/Revisions_Get1.json
 */
async function getContainerAppRevision() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsDiagnostics.getRevision(
    "rg",
    "testcontainerApp0",
    "testcontainerApp0-pjxhsye",
  );
  console.log(result);
}

async function main() {
  await getContainerAppRevision();
}

main().catch(console.error);
