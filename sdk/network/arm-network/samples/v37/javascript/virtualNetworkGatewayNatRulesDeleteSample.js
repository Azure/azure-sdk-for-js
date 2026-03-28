// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a nat rule.
 *
 * @summary deletes a nat rule.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayNatRuleDelete.json
 */
async function virtualNetworkGatewayNatRuleDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualNetworkGatewayNatRules.delete("rg1", "gateway1", "natRule1");
}

async function main() {
  await virtualNetworkGatewayNatRuleDelete();
}

main().catch(console.error);
