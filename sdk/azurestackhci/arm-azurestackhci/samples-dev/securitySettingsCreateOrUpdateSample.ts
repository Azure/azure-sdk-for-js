// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create a security setting
 *
 * @summary Create a security setting
 * x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/stable/2024-04-01/examples/PutSecuritySettings.json
 */

import type { SecuritySetting } from "@azure/arm-azurestackhci";
import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createSecuritySettings(): Promise<void> {
  const subscriptionId =
    process.env["AZURESTACKHCI_SUBSCRIPTION_ID"] || "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const resourceGroupName = process.env["AZURESTACKHCI_RESOURCE_GROUP"] || "test-rg";
  const clusterName = "myCluster";
  const securitySettingsName = "default";
  const resource: SecuritySetting = {
    securedCoreComplianceAssignment: "Audit",
    smbEncryptionForIntraClusterTrafficComplianceAssignment: "Audit",
    wdacComplianceAssignment: "ApplyAndAutoCorrect",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.securitySettings.beginCreateOrUpdateAndWait(
    resourceGroupName,
    clusterName,
    securitySettingsName,
    resource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createSecuritySettings();
}

main().catch(console.error);
