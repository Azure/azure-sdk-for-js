// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppConfigurationManagementClient } from "@azure/arm-appconfiguration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a private link resource that need to be created for a configuration store.
 *
 * @summary gets a private link resource that need to be created for a configuration store.
 * x-ms-original-file: 2025-06-01-preview/PrivateLinkResourceGet.json
 */
async function privateLinkResourcesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get(
    "myResourceGroup",
    "contoso",
    "configurationStores",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateLinkResourcesGet();
}

main().catch(console.error);
