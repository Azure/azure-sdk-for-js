// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates a configuration store with the specified parameters.
 *
 * @summary Updates a configuration store with the specified parameters.
 * x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/stable/2024-06-01/examples/ConfigurationStoresUpdate.json
 */

import {
  ConfigurationStoreUpdateParameters,
  AppConfigurationManagementClient,
} from "@azure/arm-appconfiguration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function configurationStoresUpdate(): Promise<void> {
  const subscriptionId =
    process.env["APPCONFIGURATION_SUBSCRIPTION_ID"] ||
    "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const resourceGroupName =
    process.env["APPCONFIGURATION_RESOURCE_GROUP"] || "myResourceGroup";
  const configStoreName = "contoso";
  const configStoreUpdateParameters: ConfigurationStoreUpdateParameters = {
    sku: { name: "Standard" },
    tags: { category: "Marketing" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AppConfigurationManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.configurationStores.beginUpdateAndWait(
    resourceGroupName,
    configStoreName,
    configStoreUpdateParameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates a configuration store with the specified parameters.
 *
 * @summary Updates a configuration store with the specified parameters.
 * x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/stable/2024-06-01/examples/ConfigurationStoresUpdateDisableLocalAuth.json
 */
async function configurationStoresUpdateDisableLocalAuth(): Promise<void> {
  const subscriptionId =
    process.env["APPCONFIGURATION_SUBSCRIPTION_ID"] ||
    "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const resourceGroupName =
    process.env["APPCONFIGURATION_RESOURCE_GROUP"] || "myResourceGroup";
  const configStoreName = "contoso";
  const configStoreUpdateParameters: ConfigurationStoreUpdateParameters = {
    disableLocalAuth: true,
    sku: { name: "Standard" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AppConfigurationManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.configurationStores.beginUpdateAndWait(
    resourceGroupName,
    configStoreName,
    configStoreUpdateParameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates a configuration store with the specified parameters.
 *
 * @summary Updates a configuration store with the specified parameters.
 * x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/stable/2024-06-01/examples/ConfigurationStoresUpdateWithIdentity.json
 */
async function configurationStoresUpdateWithIdentity(): Promise<void> {
  const subscriptionId =
    process.env["APPCONFIGURATION_SUBSCRIPTION_ID"] ||
    "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const resourceGroupName =
    process.env["APPCONFIGURATION_RESOURCE_GROUP"] || "myResourceGroup";
  const configStoreName = "contoso";
  const configStoreUpdateParameters: ConfigurationStoreUpdateParameters = {
    identity: {
      type: "SystemAssigned, UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/c80fb759C9654c6a91109b2b2d038882/resourcegroups/myResourceGroup1/providers/MicrosoftManagedIdentity/userAssignedIdentities/identity2":
          {},
      },
    },
    sku: { name: "Standard" },
    tags: { category: "Marketing" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AppConfigurationManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.configurationStores.beginUpdateAndWait(
    resourceGroupName,
    configStoreName,
    configStoreUpdateParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await configurationStoresUpdate();
  await configurationStoresUpdateDisableLocalAuth();
  await configurationStoresUpdateWithIdentity();
}

main().catch(console.error);
