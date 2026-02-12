// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets all default security rules in a network security group.
 *
 * @summary Gets all default security rules in a network security group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/DefaultSecurityRuleList.json
 */
async function defaultSecurityRuleList() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "testrg";
  const networkSecurityGroupName = "nsg1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.defaultSecurityRules.list(
    resourceGroupName,
    networkSecurityGroupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await defaultSecurityRuleList();
}

main().catch(console.error);
