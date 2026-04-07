// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the virtual network rule with the given name.
 *
 * @summary deletes the virtual network rule with the given name.
 * x-ms-original-file: 2025-02-01-preview/VirtualNetworkRulesDelete.json
 */
async function deleteAVirtualNetworkRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.virtualNetworkRules.delete("Default", "vnet-test-svr", "vnet-firewall-rule");
}

async function main() {
  await deleteAVirtualNetworkRule();
}

main().catch(console.error);
