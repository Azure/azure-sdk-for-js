// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to restarts a revision for a Container App
 *
 * @summary restarts a revision for a Container App
 * x-ms-original-file: 2025-10-02-preview/Revisions_Restart.json
 */
async function restartContainerAppRevision() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.containerAppsRevisions.restartRevision(
    "rg",
    "testStaticSite0",
    "testcontainerApp0-pjxhsye",
  );
}

async function main() {
  await restartContainerAppRevision();
}

main().catch(console.error);
