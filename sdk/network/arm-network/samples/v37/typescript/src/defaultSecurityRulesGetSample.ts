// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the specified default network security rule.
 *
 * @summary get the specified default network security rule.
 * x-ms-original-file: 2025-05-01/DefaultSecurityRuleGet.json
 */
async function defaultSecurityRuleGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.defaultSecurityRules.get("testrg", "nsg1", "AllowVnetInBound");
  console.log(result);
}

async function main(): Promise<void> {
  await defaultSecurityRuleGet();
}

main().catch(console.error);
