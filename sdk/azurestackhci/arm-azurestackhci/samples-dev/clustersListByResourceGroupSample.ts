// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List all HCI clusters in a resource group.
 *
 * @summary List all HCI clusters in a resource group.
 * x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/stable/2024-04-01/examples/ListClustersByResourceGroup.json
 */
async function listClustersInAGivenResourceGroup(): Promise<void> {
  const subscriptionId =
    process.env["AZURESTACKHCI_SUBSCRIPTION_ID"] || "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const resourceGroupName = process.env["AZURESTACKHCI_RESOURCE_GROUP"] || "test-rg";
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusters.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listClustersInAGivenResourceGroup();
}

main().catch(console.error);
