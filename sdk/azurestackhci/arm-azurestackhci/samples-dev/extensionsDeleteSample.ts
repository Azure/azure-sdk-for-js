// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete particular Arc Extension of HCI Cluster.
 *
 * @summary Delete particular Arc Extension of HCI Cluster.
 * x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/stable/2024-04-01/examples/DeleteExtension.json
 */

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteArcExtension(): Promise<void> {
  const subscriptionId =
    process.env["AZURESTACKHCI_SUBSCRIPTION_ID"] || "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const resourceGroupName = process.env["AZURESTACKHCI_RESOURCE_GROUP"] || "test-rg";
  const clusterName = "myCluster";
  const arcSettingName = "default";
  const extensionName = "MicrosoftMonitoringAgent";
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.extensions.beginDeleteAndWait(
    resourceGroupName,
    clusterName,
    arcSettingName,
    extensionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteArcExtension();
}

main().catch(console.error);
