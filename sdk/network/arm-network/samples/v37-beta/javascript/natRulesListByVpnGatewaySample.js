// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves all nat rules for a particular virtual wan vpn gateway.
 *
 * @summary retrieves all nat rules for a particular virtual wan vpn gateway.
 * x-ms-original-file: 2025-05-01/NatRuleList.json
 */
async function natRuleList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.natRules.listByVpnGateway("rg1", "gateway1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await natRuleList();
}

main().catch(console.error);
