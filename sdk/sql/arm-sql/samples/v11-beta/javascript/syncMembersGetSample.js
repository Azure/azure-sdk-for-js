// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a sync member.
 *
 * @summary gets a sync member.
 * x-ms-original-file: 2025-02-01-preview/SyncMemberGet.json
 */
async function getASyncMember() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.syncMembers.get(
    "syncgroupcrud-65440",
    "syncgroupcrud-8475",
    "syncgroupcrud-4328",
    "syncgroupcrud-3187",
    "syncmembercrud-4879",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a sync member.
 *
 * @summary gets a sync member.
 * x-ms-original-file: 2025-02-01-preview/SyncMemberGetWithIdentity.json
 */
async function getASyncMemberWithUserAssignedIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.syncMembers.get(
    "syncgroupcrud-65440",
    "syncgroupcrud-8475",
    "syncgroupcrud-4328",
    "syncgroupcrud-3187",
    "syncmembercrud-4879",
  );
  console.log(result);
}

async function main() {
  await getASyncMember();
  await getASyncMemberWithUserAssignedIdentity();
}

main().catch(console.error);
