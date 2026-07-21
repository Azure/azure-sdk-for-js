// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about the specified interconnect group.
 *
 * @summary gets information about the specified interconnect group.
 * x-ms-original-file: 2025-07-01/InterconnectGroupGet.json
 */
async function getInterconnectGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.interconnectGroups.get("rg1", "test-ig");
  console.log(result);
}

async function main() {
  await getInterconnectGroup();
}

main().catch(console.error);
