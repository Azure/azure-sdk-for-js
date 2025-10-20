// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-virtualenclaves";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list TransitHubResource resources by CommunityResource
 *
 * @summary list TransitHubResource resources by CommunityResource
 * x-ms-original-file: 2025-05-01-preview/TransitHub_ListByCommunityResource.json
 */
async function transitHubListByCommunityResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CA1CB369-DD26-4DB2-9D43-9AFEF0F22093";
  const client = new MissionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.transitHub.listByCommunityResource(
    "rgopenapi",
    "TestMyCommunity",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await transitHubListByCommunityResource();
}

main().catch(console.error);
