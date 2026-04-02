// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified ipGroups.
 *
 * @summary gets the specified ipGroups.
 * x-ms-original-file: 2025-05-01/IpGroupsGet.json
 */
async function getIpGroups() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.ipGroups.get("myResourceGroup", "ipGroups1");
  console.log(result);
}

async function main() {
  await getIpGroups();
}

main().catch(console.error);
