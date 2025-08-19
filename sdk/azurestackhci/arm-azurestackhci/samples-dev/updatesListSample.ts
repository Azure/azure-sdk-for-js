// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List all Updates
 *
 * @summary List all Updates
 * x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/stable/2024-04-01/examples/ListUpdates.json
 */

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAvailableUpdates(): Promise<void> {
  const subscriptionId =
    process.env["AZURESTACKHCI_SUBSCRIPTION_ID"] || "b8d594e5-51f3-4c11-9c54-a7771b81c712";
  const resourceGroupName = process.env["AZURESTACKHCI_RESOURCE_GROUP"] || "testrg";
  const clusterName = "testcluster";
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.updates.list(resourceGroupName, clusterName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAvailableUpdates();
}

main().catch(console.error);
