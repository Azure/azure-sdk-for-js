// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-enclave";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list DedicatedHubResource resources by subscription ID
 *
 * @summary list DedicatedHubResource resources by subscription ID
 * x-ms-original-file: 2026-03-01-preview/DedicatedHubs_ListBySubscription.json
 */
async function dedicatedHubListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c";
  const client = new MissionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dedicatedHub.listBySubscription("TestCommunity1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await dedicatedHubListBySubscription();
}

main().catch(console.error);
