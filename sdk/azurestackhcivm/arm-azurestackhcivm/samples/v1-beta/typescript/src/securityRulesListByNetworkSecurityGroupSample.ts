// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all security rules in a Network Security Group.
 *
 * @summary gets all security rules in a Network Security Group.
 * x-ms-original-file: 2025-06-01-preview/SecurityRules_ListByNetworkSecurityGroup.json
 */
async function listNetworkSecurityRulesInNetworkSecurityGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.securityRules.listByNetworkSecurityGroup("testrg", "testnsg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listNetworkSecurityRulesInNetworkSecurityGroup();
}

main().catch(console.error);
