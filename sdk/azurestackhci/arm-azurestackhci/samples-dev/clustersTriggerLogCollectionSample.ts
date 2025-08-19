// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { LogCollectionRequest } from "@azure/arm-azurestackhci";
import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Trigger Log Collection on a cluster
 *
 * @summary Trigger Log Collection on a cluster
 * x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/stable/2024-04-01/examples/TriggerLogCollection.json
 */
async function triggerLogCollection(): Promise<void> {
  const subscriptionId =
    process.env["AZURESTACKHCI_SUBSCRIPTION_ID"] || "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const resourceGroupName = process.env["AZURESTACKHCI_RESOURCE_GROUP"] || "test-rg";
  const clusterName = "mycluster";
  const logCollectionRequest: LogCollectionRequest = {
    properties: {
      fromDate: new Date("2020-01-01T17:18:19.1234567Z"),
      toDate: new Date("2021-01-01T17:18:19.1234567Z"),
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusters.beginTriggerLogCollectionAndWait(
    resourceGroupName,
    clusterName,
    logCollectionRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await triggerLogCollection();
}

main().catch(console.error);
