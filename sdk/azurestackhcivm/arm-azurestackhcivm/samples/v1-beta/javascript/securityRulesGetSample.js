// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIVMManagementClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified security rule.
 *
 * @summary gets the specified security rule.
 * x-ms-original-file: 2025-06-01-preview/SecurityRules_Get.json
 */
async function getNetworkSecurityRuleInNetworkSecurityGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.securityRules.get("testrg", "testnsg", "rule1");
  console.log(result);
}

async function main() {
  await getNetworkSecurityRuleInNetworkSecurityGroup();
}

main().catch(console.error);
