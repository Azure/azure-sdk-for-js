// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to organization accounts invitation details
 *
 * @summary organization accounts invitation details
 * x-ms-original-file: 2025-08-18-preview/Access_ListInvitations_MaximumSet_Gen.json
 */
async function accessListInvitationsMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.listInvitations(
    "rgconfluent",
    "ltmhusxnwxyfnbgcvwktxqrlqabbre",
    { searchFilters: { key8083: "ft" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to organization accounts invitation details
 *
 * @summary organization accounts invitation details
 * x-ms-original-file: 2025-08-18-preview/Access_ListInvitations_MinimumSet_Gen.json
 */
async function accessListInvitationsMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.listInvitations(
    "rgconfluent",
    "edpxevovxieanzlscvflmmcuoracwh",
    {},
  );
  console.log(result);
}

async function main(): Promise<void> {
  await accessListInvitationsMaximumSet();
  await accessListInvitationsMinimumSet();
}

main().catch(console.error);
