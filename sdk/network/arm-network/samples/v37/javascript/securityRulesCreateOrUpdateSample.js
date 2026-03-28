// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a security rule in the specified network security group.
 *
 * @summary creates or updates a security rule in the specified network security group.
 * x-ms-original-file: 2025-05-01/NetworkSecurityGroupRuleCreate.json
 */
async function createSecurityRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.securityRules.createOrUpdate("rg1", "testnsg", "rule1", {
    access: "Deny",
    destinationAddressPrefix: "11.0.0.0/8",
    destinationPortRange: "8080",
    direction: "Outbound",
    priority: 100,
    sourceAddressPrefix: "10.0.0.0/8",
    sourcePortRange: "*",
    protocol: "*",
  });
  console.log(result);
}

async function main() {
  await createSecurityRule();
}

main().catch(console.error);
