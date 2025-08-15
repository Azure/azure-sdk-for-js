// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIVMManagementClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified security rule.
 *
 * @summary deletes the specified security rule.
 * x-ms-original-file: 2025-06-01-preview/SecurityRules_Delete.json
 */
async function securityRulesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  await client.securityRules.delete("testrg", "testnsg", "rule1");
}

async function main() {
  await securityRulesDelete();
}

main().catch(console.error);
