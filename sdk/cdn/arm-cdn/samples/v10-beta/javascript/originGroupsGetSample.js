// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an existing origin group within an endpoint.
 *
 * @summary gets an existing origin group within an endpoint.
 * x-ms-original-file: 2025-12-01/OriginGroups_Get.json
 */
async function originGroupsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.originGroups.get("RG", "profile1", "endpoint1", "originGroup1");
  console.log(result);
}

async function main() {
  await originGroupsGet();
}

main().catch(console.error);
