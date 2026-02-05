// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppConfigurationManagementClient } from "@azure/arm-appconfiguration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the private link resources that need to be created for a configuration store.
 *
 * @summary gets the private link resources that need to be created for a configuration store.
 * x-ms-original-file: 2025-06-01-preview/PrivateLinkResourcesListByConfigurationStore.json
 */
async function privateLinkResourcesListGroupIds(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkResources.listByConfigurationStore(
    "myResourceGroup",
    "contoso",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await privateLinkResourcesListGroupIds();
}

main().catch(console.error);
