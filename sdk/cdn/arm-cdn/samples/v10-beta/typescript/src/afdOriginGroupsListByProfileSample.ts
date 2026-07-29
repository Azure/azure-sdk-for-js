// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the existing origin groups within a profile.
 *
 * @summary lists all of the existing origin groups within a profile.
 * x-ms-original-file: 2025-12-01/AFDOriginGroups_ListByProfile.json
 */
async function afdOriginGroupsListByProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.afdOriginGroups.listByProfile("RG", "profile1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await afdOriginGroupsListByProfile();
}

main().catch(console.error);
