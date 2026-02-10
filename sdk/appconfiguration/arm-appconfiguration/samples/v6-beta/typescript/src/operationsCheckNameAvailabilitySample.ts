// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppConfigurationManagementClient } from "@azure/arm-appconfiguration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks whether the configuration store name is available for use.
 *
 * @summary checks whether the configuration store name is available for use.
 * x-ms-original-file: 2025-06-01-preview/CheckNameAvailable.json
 */
async function configurationStoresCheckNameAvailable(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.operations.checkNameAvailability({
    name: "contoso",
    type: "Microsoft.AppConfiguration/configurationStores",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to checks whether the configuration store name is available for use.
 *
 * @summary checks whether the configuration store name is available for use.
 * x-ms-original-file: 2025-06-01-preview/CheckNameNotAvailable.json
 */
async function configurationStoresCheckNameNotAvailable(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.operations.checkNameAvailability({
    name: "contoso",
    type: "Microsoft.AppConfiguration/configurationStores",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await configurationStoresCheckNameAvailable();
  await configurationStoresCheckNameNotAvailable();
}

main().catch(console.error);
