// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all security rules in a network security group.
 *
 * @summary gets all security rules in a network security group.
 * x-ms-original-file: 2025-05-01/NetworkSecurityGroupRuleList.json
 */
async function listNetworkSecurityRulesInNetworkSecurityGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.securityRules.list("rg1", "testnsg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listNetworkSecurityRulesInNetworkSecurityGroup();
}

main().catch(console.error);
