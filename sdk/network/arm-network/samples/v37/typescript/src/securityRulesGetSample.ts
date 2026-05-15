// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the specified network security rule.
 *
 * @summary get the specified network security rule.
 * x-ms-original-file: 2025-05-01/NetworkSecurityGroupRuleGet.json
 */
async function getNetworkSecurityRuleInNetworkSecurityGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.securityRules.get("rg1", "testnsg", "rule1");
  console.log(result);
}

async function main(): Promise<void> {
  await getNetworkSecurityRuleInNetworkSecurityGroup();
}

main().catch(console.error);
