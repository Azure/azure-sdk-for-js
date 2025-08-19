// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create Extension for HCI cluster.
 *
 * @summary Create Extension for HCI cluster.
 * x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/stable/2024-04-01/examples/PutExtension.json
 */

import type { Extension } from "@azure/arm-azurestackhci";
import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createArcExtension(): Promise<void> {
  const subscriptionId =
    process.env["AZURESTACKHCI_SUBSCRIPTION_ID"] || "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const resourceGroupName = process.env["AZURESTACKHCI_RESOURCE_GROUP"] || "test-rg";
  const clusterName = "myCluster";
  const arcSettingName = "default";
  const extensionName = "MicrosoftMonitoringAgent";
  const extension: Extension = {
    typePropertiesExtensionParametersType: "MicrosoftMonitoringAgent",
    enableAutomaticUpgrade: false,
    protectedSettings: { workspaceKey: "xx" },
    publisher: "Microsoft.Compute",
    settings: { workspaceId: "xx" },
    typeHandlerVersion: "1.10",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.extensions.beginCreateAndWait(
    resourceGroupName,
    clusterName,
    arcSettingName,
    extensionName,
    extension,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createArcExtension();
}

main().catch(console.error);
