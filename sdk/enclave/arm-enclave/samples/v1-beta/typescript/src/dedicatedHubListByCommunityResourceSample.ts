// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-enclave";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list DedicatedHubResource resources by CommunityResource
 *
 * @summary list DedicatedHubResource resources by CommunityResource
 * x-ms-original-file: 2026-03-01-preview/DedicatedHubs_ListByCommunityResource.json
 */
async function dedicatedHubListByCommunityResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c";
  const client = new MissionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dedicatedHub.listByCommunityResource(
    "TestResourceGroup",
    "TestCommunity",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await dedicatedHubListByCommunityResource();
}

main().catch(console.error);
