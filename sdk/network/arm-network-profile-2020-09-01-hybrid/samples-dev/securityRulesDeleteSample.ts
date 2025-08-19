// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the specified network security rule.
 *
 * @summary Deletes the specified network security rule.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2018-11-01/examples/NetworkSecurityGroupRuleDelete.json
 */

import { NetworkManagementClient } from "@azure/arm-network-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteNetworkSecurityRuleFromNetworkSecurityGroup(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkSecurityGroupName = "testnsg";
  const securityRuleName = "rule1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.securityRules.beginDeleteAndWait(
    resourceGroupName,
    networkSecurityGroupName,
    securityRuleName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteNetworkSecurityRuleFromNetworkSecurityGroup();
}

main().catch(console.error);
