// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerserviceaimanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a AIManager
 *
 * @summary get a AIManager
 * x-ms-original-file: 2026-09-02-preview/AIManagers_Get.json
 */
async function getsAnAIManagerResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.aiManagers.get("rg1", "aimanager1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a AIManager
 *
 * @summary get a AIManager
 * x-ms-original-file: 2026-09-02-preview/AIManagers_Get_BYO.json
 */
async function getsAnAIManagerResourceAttachedToAnExistingAKSClusterBringYourOwn(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.aiManagers.get("rg1", "aimanager1");
  console.log(result);
}

async function main(): Promise<void> {
  await getsAnAIManagerResource();
  await getsAnAIManagerResourceAttachedToAnExistingAKSClusterBringYourOwn();
}

main().catch(console.error);
