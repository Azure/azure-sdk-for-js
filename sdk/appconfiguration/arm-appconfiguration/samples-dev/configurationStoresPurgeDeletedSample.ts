// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Permanently deletes the specified configuration store.
 *
 * @summary Permanently deletes the specified configuration store.
 * x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/stable/2024-06-01/examples/DeletedConfigurationStoresPurge.json
 */

import { AppConfigurationManagementClient } from "@azure/arm-appconfiguration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function purgeADeletedConfigurationStore(): Promise<void> {
  const subscriptionId =
    process.env["APPCONFIGURATION_SUBSCRIPTION_ID"] ||
    "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const location = "westus";
  const configStoreName = "contoso";
  const credential = new DefaultAzureCredential();
  const client = new AppConfigurationManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.configurationStores.beginPurgeDeletedAndWait(
    location,
    configStoreName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await purgeADeletedConfigurationStore();
}

main().catch(console.error);
