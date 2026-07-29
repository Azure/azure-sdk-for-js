// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete container app resiliency policy.
 *
 * @summary delete container app resiliency policy.
 * x-ms-original-file: 2025-10-02-preview/AppResiliency_Delete.json
 */
async function deleteAppResiliency(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.appResiliency.delete("rg", "testcontainerApp0", "resiliency-policy-1");
}

async function main(): Promise<void> {
  await deleteAppResiliency();
}

main().catch(console.error);
