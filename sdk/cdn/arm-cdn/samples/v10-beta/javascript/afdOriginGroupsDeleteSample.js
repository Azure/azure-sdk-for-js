// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing origin group within a profile.
 *
 * @summary deletes an existing origin group within a profile.
 * x-ms-original-file: 2025-12-01/AFDOriginGroups_Delete.json
 */
async function afdOriginGroupsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  await client.afdOriginGroups.delete("RG", "profile1", "origingroup1");
}

async function main() {
  await afdOriginGroupsDelete();
}

main().catch(console.error);
