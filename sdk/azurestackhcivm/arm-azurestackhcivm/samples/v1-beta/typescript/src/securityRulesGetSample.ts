// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified security rule.
 *
 * @summary gets the specified security rule.
 * x-ms-original-file: 2025-06-01-preview/SecurityRules_Get.json
 */
async function getNetworkSecurityRuleInNetworkSecurityGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.securityRules.get("testrg", "testnsg", "rule1");
  console.log(result);
}

async function main(): Promise<void> {
  await getNetworkSecurityRuleInNetworkSecurityGroup();
}

main().catch(console.error);
