// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a sync member.
 *
 * @summary deletes a sync member.
 * x-ms-original-file: 2025-02-01-preview/SyncMemberDelete.json
 */
async function deleteASyncMember(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.syncMembers.delete(
    "syncgroupcrud-65440",
    "syncgroupcrud-8475",
    "syncgroupcrud-4328",
    "syncgroupcrud-3187",
    "syncgroupcrud-4879",
  );
}

async function main(): Promise<void> {
  await deleteASyncMember();
}

main().catch(console.error);
