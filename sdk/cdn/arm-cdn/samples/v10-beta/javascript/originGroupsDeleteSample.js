// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing origin group within an endpoint.
 *
 * @summary deletes an existing origin group within an endpoint.
 * x-ms-original-file: 2025-12-01/OriginGroups_Delete.json
 */
async function originGroupsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  await client.originGroups.delete("RG", "profile1", "endpoint1", "originGroup1");
}

async function main() {
  await originGroupsDelete();
}

main().catch(console.error);
