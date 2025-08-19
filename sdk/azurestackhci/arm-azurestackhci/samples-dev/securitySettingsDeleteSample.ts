// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete a SecuritySetting
 *
 * @summary Delete a SecuritySetting
 * x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/stable/2024-04-01/examples/DeleteSecuritySettings.json
 */
async function deleteSecuritySettings(): Promise<void> {
  const subscriptionId =
    process.env["AZURESTACKHCI_SUBSCRIPTION_ID"] || "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const resourceGroupName = process.env["AZURESTACKHCI_RESOURCE_GROUP"] || "test-rg";
  const clusterName = "myCluster";
  const securitySettingsName = "default";
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.securitySettings.beginDeleteAndWait(
    resourceGroupName,
    clusterName,
    securitySettingsName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteSecuritySettings();
}

main().catch(console.error);
