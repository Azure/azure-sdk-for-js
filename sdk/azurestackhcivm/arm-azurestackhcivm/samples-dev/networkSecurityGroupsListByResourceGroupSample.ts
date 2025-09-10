// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to gets all network security groups in a resource group.
 *
 * @summary gets all network security groups in a resource group.
 * x-ms-original-file: 2025-06-01-preview/NetworkSecurityGroups_ListByResourceGroup.json
 */

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

async function listNetworkSecurityGroupsInResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityGroups.listByResourceGroup("testrg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listNetworkSecurityGroupsInResourceGroup();
}

main().catch(console.error);
