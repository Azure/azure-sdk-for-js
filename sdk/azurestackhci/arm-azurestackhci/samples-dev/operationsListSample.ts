// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List all available Microsoft.AzureStackHCI provider operations
 *
 * @summary List all available Microsoft.AzureStackHCI provider operations
 * x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/operations/stable/2024-04-01/examples/ListOperations.json
 */
async function createCluster(): Promise<void> {
  const subscriptionId =
    process.env["AZURESTACKHCI_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.operations.list();
  console.log(result);
}

async function main(): Promise<void> {
  await createCluster();
}

main().catch(console.error);
