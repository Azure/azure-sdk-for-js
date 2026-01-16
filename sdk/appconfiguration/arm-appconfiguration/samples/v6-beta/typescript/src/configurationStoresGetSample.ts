// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppConfigurationManagementClient } from "@azure/arm-appconfiguration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the properties of the specified configuration store.
 *
 * @summary gets the properties of the specified configuration store.
 * x-ms-original-file: 2025-06-01-preview/ConfigurationStoresGet.json
 */
async function configurationStoresGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.configurationStores.get("myResourceGroup", "contoso");
  console.log(result);
}

async function main(): Promise<void> {
  await configurationStoresGet();
}

main().catch(console.error);
