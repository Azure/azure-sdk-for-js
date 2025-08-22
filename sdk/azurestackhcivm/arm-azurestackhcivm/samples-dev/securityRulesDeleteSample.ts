// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to deletes the specified security rule.
 *
 * @summary deletes the specified security rule.
 * x-ms-original-file: 2025-06-01-preview/SecurityRules_Delete.json
 */

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

async function securityRulesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  await client.securityRules.delete("testrg", "testnsg", "rule1");
}

async function main(): Promise<void> {
  await securityRulesDelete();
}

main().catch(console.error);
