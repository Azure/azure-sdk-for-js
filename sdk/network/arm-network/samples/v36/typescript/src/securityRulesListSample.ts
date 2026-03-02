// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets all security rules in a network security group.
 *
 * @summary Gets all security rules in a network security group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkSecurityGroupRuleList.json
 */
async function listNetworkSecurityRulesInNetworkSecurityGroup(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkSecurityGroupName = "testnsg";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.securityRules.list(
    resourceGroupName,
    networkSecurityGroupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listNetworkSecurityRulesInNetworkSecurityGroup();
}

main().catch(console.error);
