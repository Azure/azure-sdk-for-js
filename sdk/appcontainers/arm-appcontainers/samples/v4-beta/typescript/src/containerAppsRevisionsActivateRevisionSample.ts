// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to activates a revision for a Container App
 *
 * @summary activates a revision for a Container App
 * x-ms-original-file: 2025-10-02-preview/Revisions_Activate.json
 */
async function activateContainerAppRevision(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.containerAppsRevisions.activateRevision(
    "rg",
    "testcontainerApp0",
    "testcontainerApp0-pjxhsye",
  );
}

async function main(): Promise<void> {
  await activateContainerAppRevision();
}

main().catch(console.error);
