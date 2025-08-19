// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List all HCI clusters in a subscription.
 *
 * @summary List all HCI clusters in a subscription.
 * x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/stable/2024-04-01/examples/ListClustersBySubscription.json
 */
async function listClustersInAGivenSubscription(): Promise<void> {
  const subscriptionId =
    process.env["AZURESTACKHCI_SUBSCRIPTION_ID"] || "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusters.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listClustersInAGivenSubscription();
}

main().catch(console.error);
