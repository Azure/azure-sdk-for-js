// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update container app resiliency policy.
 *
 * @summary update container app resiliency policy.
 * x-ms-original-file: 2025-10-02-preview/AppResiliency_Patch.json
 */
async function updateAppResiliency(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.appResiliency.update(
    "rg",
    "testcontainerApp0",
    "resiliency-policy-1",
    { timeoutPolicy: { connectionTimeoutInSeconds: 40, responseTimeoutInSeconds: 30 } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAppResiliency();
}

main().catch(console.error);
