// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppConfigurationManagementClient } from "@azure/arm-appconfiguration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified network security perimeter configuration associated with the configuration store.
 *
 * @summary gets the specified network security perimeter configuration associated with the configuration store.
 * x-ms-original-file: 2025-08-01-preview/ConfigurationStoresGetNetworkSecurityPerimeterConfiguration.json
 */
async function networkSecurityPerimeterConfigurationsGetNetworkSecurityPerimeterConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterConfigurations.get(
    "myResourceGroup",
    "contoso",
    "804a12bb-1349-4228-81be-8fe888aae04e.myAssociationName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkSecurityPerimeterConfigurationsGetNetworkSecurityPerimeterConfiguration();
}

main().catch(console.error);
