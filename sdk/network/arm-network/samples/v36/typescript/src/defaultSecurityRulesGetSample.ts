// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get the specified default network security rule.
 *
 * @summary Get the specified default network security rule.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/DefaultSecurityRuleGet.json
 */
async function defaultSecurityRuleGet(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "testrg";
  const networkSecurityGroupName = "nsg1";
  const defaultSecurityRuleName = "AllowVnetInBound";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.defaultSecurityRules.get(
    resourceGroupName,
    networkSecurityGroupName,
    defaultSecurityRuleName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await defaultSecurityRuleGet();
}

main().catch(console.error);
