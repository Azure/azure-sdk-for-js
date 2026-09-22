// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing origin group within a profile.
 *
 * @summary deletes an existing origin group within a profile.
 * x-ms-original-file: 2025-12-01/AFDOriginGroups_Delete.json
 */
async function afdOriginGroupsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  await client.afdOriginGroups.delete("RG", "profile1", "origingroup1");
}

async function main(): Promise<void> {
  await afdOriginGroupsDelete();
}

main().catch(console.error);
