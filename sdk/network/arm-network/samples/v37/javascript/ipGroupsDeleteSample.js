// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified ipGroups.
 *
 * @summary deletes the specified ipGroups.
 * x-ms-original-file: 2025-05-01/IpGroupsDelete.json
 */
async function deleteIpGroups() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.ipGroups.delete("myResourceGroup", "ipGroups1");
}

async function main() {
  await deleteIpGroups();
}

main().catch(console.error);
