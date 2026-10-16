// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get all SandboxGroups for a subscription.
 *
 * @summary get all SandboxGroups for a subscription.
 * x-ms-original-file: 2026-07-01/SandboxGroups_ListBySubscription.json
 */
async function listSandboxGroupsBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sandboxGroups.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listSandboxGroupsBySubscription();
}

main().catch(console.error);
