// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list replicas for a Container App Revision.
 *
 * @summary list replicas for a Container App Revision.
 * x-ms-original-file: 2025-10-02-preview/Replicas_List.json
 */
async function listContainerAppReplicas(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "651f8027-33e8-4ec4-97b4-f6e9f3dc8744";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsRevisionReplicas.listReplicas(
    "workerapps-rg-xj",
    "myapp",
    "myapp--0wlqy09",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listContainerAppReplicas();
}

main().catch(console.error);
