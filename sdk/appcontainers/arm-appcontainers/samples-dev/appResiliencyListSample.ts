// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list container app resiliency policies.
 *
 * @summary list container app resiliency policies.
 * x-ms-original-file: 2025-10-02-preview/AppResiliency_List.json
 */
async function listAppResiliency(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.appResiliency.list("rg", "testcontainerApp0")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAppResiliency();
}

main().catch(console.error);
