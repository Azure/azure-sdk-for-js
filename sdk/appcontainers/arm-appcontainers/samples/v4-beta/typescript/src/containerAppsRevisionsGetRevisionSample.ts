// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a revision of a Container App.
 *
 * @summary get a revision of a Container App.
 * x-ms-original-file: 2025-10-02-preview/Revisions_Get.json
 */
async function getContainerAppRevision(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsRevisions.getRevision(
    "rg",
    "testcontainerApp0",
    "testcontainerApp0-pjxhsye",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getContainerAppRevision();
}

main().catch(console.error);
