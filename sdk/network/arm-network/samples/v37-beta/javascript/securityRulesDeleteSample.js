// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified network security rule.
 *
 * @summary deletes the specified network security rule.
 * x-ms-original-file: 2025-05-01/NetworkSecurityGroupRuleDelete.json
 */
async function deleteNetworkSecurityRuleFromNetworkSecurityGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.securityRules.delete("rg1", "testnsg", "rule1");
}

async function main() {
  await deleteNetworkSecurityRuleFromNetworkSecurityGroup();
}

main().catch(console.error);
