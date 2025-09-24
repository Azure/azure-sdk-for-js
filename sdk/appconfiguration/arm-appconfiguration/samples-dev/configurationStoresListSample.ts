// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the configuration stores for a given subscription.
 *
 * @summary Lists the configuration stores for a given subscription.
 * x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/stable/2024-06-01/examples/ConfigurationStoresList.json
 */

import { AppConfigurationManagementClient } from "@azure/arm-appconfiguration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function configurationStoresList(): Promise<void> {
  const subscriptionId =
    process.env["APPCONFIGURATION_SUBSCRIPTION_ID"] ||
    "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const credential = new DefaultAzureCredential();
  const client = new AppConfigurationManagementClient(
    credential,
    subscriptionId,
  );
  const resArray = new Array();
  for await (const item of client.configurationStores.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await configurationStoresList();
}

main().catch(console.error);
