// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an existing origin group within a profile.
 *
 * @summary gets an existing origin group within a profile.
 * x-ms-original-file: 2025-12-01/AFDOriginGroups_Get.json
 */
async function afdOriginGroupsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.afdOriginGroups.get("RG", "profile1", "origingroup1");
  console.log(result);
}

async function main() {
  await afdOriginGroupsGet();
}

main().catch(console.error);
