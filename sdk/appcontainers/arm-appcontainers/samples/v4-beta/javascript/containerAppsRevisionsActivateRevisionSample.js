// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to activates a revision for a Container App
 *
 * @summary activates a revision for a Container App
 * x-ms-original-file: 2025-10-02-preview/Revisions_Activate.json
 */
async function activateContainerAppRevision() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.containerAppsRevisions.activateRevision(
    "rg",
    "testcontainerApp0",
    "testcontainerApp0-pjxhsye",
  );
}

async function main() {
  await activateContainerAppRevision();
}

main().catch(console.error);
