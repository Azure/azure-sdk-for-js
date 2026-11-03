// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppConfigurationManagementClient } from "@azure/arm-appconfiguration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to forces a refresh of the specified network security perimeter configuration.
 *
 * @summary forces a refresh of the specified network security perimeter configuration.
 * x-ms-original-file: 2025-08-01-preview/ConfigurationStoresReconcileNetworkSecurityPerimeterConfiguration.json
 */
async function networkSecurityPerimeterConfigurationsReconcile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  await client.networkSecurityPerimeterConfigurations.reconcile(
    "myResourceGroup",
    "contoso",
    "804a12bb-1349-4228-81be-8fe888aae04e.myAssociationName",
  );
}

async function main(): Promise<void> {
  await networkSecurityPerimeterConfigurationsReconcile();
}

main().catch(console.error);
