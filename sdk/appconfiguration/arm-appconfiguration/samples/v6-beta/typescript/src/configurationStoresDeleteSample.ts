// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppConfigurationManagementClient } from "@azure/arm-appconfiguration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a configuration store.
 *
 * @summary deletes a configuration store.
 * x-ms-original-file: 2025-06-01-preview/ConfigurationStoresDelete.json
 */
async function configurationStoresDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  await client.configurationStores.delete("myResourceGroup", "contoso");
}

async function main(): Promise<void> {
  await configurationStoresDelete();
}

main().catch(console.error);
