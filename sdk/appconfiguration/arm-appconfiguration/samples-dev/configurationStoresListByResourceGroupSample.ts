// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the configuration stores for a given resource group.
 *
 * @summary Lists the configuration stores for a given resource group.
 * x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/stable/2024-06-01/examples/ConfigurationStoresListByResourceGroup.json
 */

import { AppConfigurationManagementClient } from "@azure/arm-appconfiguration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function configurationStoresListByResourceGroup(): Promise<void> {
  const subscriptionId =
    process.env["APPCONFIGURATION_SUBSCRIPTION_ID"] ||
    "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const resourceGroupName =
    process.env["APPCONFIGURATION_RESOURCE_GROUP"] || "myResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new AppConfigurationManagementClient(
    credential,
    subscriptionId,
  );
  const resArray = new Array();
  for await (const item of client.configurationStores.listByResourceGroup(
    resourceGroupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await configurationStoresListByResourceGroup();
}

main().catch(console.error);
