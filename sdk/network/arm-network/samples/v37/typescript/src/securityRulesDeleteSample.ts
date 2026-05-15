// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified network security rule.
 *
 * @summary deletes the specified network security rule.
 * x-ms-original-file: 2025-05-01/NetworkSecurityGroupRuleDelete.json
 */
async function deleteNetworkSecurityRuleFromNetworkSecurityGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.securityRules.delete("rg1", "testnsg", "rule1");
}

async function main(): Promise<void> {
  await deleteNetworkSecurityRuleFromNetworkSecurityGroup();
}

main().catch(console.error);
