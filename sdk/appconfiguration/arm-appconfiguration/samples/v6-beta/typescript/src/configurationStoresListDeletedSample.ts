// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppConfigurationManagementClient } from "@azure/arm-appconfiguration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about the deleted configuration stores in a subscription.
 *
 * @summary gets information about the deleted configuration stores in a subscription.
 * x-ms-original-file: 2025-06-01-preview/DeletedConfigurationStoresList.json
 */
async function deletedConfigurationStoresList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.configurationStores.listDeleted()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await deletedConfigurationStoresList();
}

main().catch(console.error);
