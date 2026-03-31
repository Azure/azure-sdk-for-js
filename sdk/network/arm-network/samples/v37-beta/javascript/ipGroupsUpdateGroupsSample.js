// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates tags of an IpGroups resource.
 *
 * @summary updates tags of an IpGroups resource.
 * x-ms-original-file: 2025-05-01/IpGroupsUpdateTags.json
 */
async function updateIpGroups() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.ipGroups.updateGroups("myResourceGroup", "ipGroups1", {
    tags: { key1: "value1", key2: "value2" },
  });
  console.log(result);
}

async function main() {
  await updateIpGroups();
}

main().catch(console.error);
