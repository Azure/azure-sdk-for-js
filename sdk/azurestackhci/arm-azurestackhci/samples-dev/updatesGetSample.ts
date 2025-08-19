// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get specified Update
 *
 * @summary Get specified Update
 * x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/stable/2024-04-01/examples/GetUpdates.json
 */
async function getASpecificUpdate(): Promise<void> {
  const subscriptionId =
    process.env["AZURESTACKHCI_SUBSCRIPTION_ID"] || "b8d594e5-51f3-4c11-9c54-a7771b81c712";
  const resourceGroupName = process.env["AZURESTACKHCI_RESOURCE_GROUP"] || "testrg";
  const clusterName = "testcluster";
  const updateName = "Microsoft4.2203.2.32";
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.updates.get(resourceGroupName, clusterName, updateName);
  console.log(result);
}

async function main(): Promise<void> {
  await getASpecificUpdate();
}

main().catch(console.error);
