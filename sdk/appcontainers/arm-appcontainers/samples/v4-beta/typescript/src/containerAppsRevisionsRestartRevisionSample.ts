// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to restarts a revision for a Container App
 *
 * @summary restarts a revision for a Container App
 * x-ms-original-file: 2025-10-02-preview/Revisions_Restart.json
 */
async function restartContainerAppRevision(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.containerAppsRevisions.restartRevision(
    "rg",
    "testStaticSite0",
    "testcontainerApp0-pjxhsye",
  );
}

async function main(): Promise<void> {
  await restartContainerAppRevision();
}

main().catch(console.error);
