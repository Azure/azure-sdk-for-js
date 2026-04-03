// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppConfigurationManagementClient } from "@azure/arm-appconfiguration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a configuration store with the specified parameters.
 *
 * @summary updates a configuration store with the specified parameters.
 * x-ms-original-file: 2025-06-01-preview/ConfigurationStoresUpdate.json
 */
async function configurationStoresUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.configurationStores.update("myResourceGroup", "contoso", {
    sku: { name: "Standard" },
    tags: { Category: "Marketing" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a configuration store with the specified parameters.
 *
 * @summary updates a configuration store with the specified parameters.
 * x-ms-original-file: 2025-06-01-preview/ConfigurationStoresUpdateDisableLocalAuth.json
 */
async function configurationStoresUpdateDisableLocalAuth(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.configurationStores.update("myResourceGroup", "contoso", {
    disableLocalAuth: true,
    sku: { name: "Standard" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a configuration store with the specified parameters.
 *
 * @summary updates a configuration store with the specified parameters.
 * x-ms-original-file: 2025-06-01-preview/ConfigurationStoresUpdateWithIdentity.json
 */
async function configurationStoresUpdateWithIdentity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.configurationStores.update("myResourceGroup", "contoso", {
    identity: {
      type: "SystemAssigned, UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/c80fb759-c965-4c6a-9110-9b2b2d038882/resourcegroups/myResourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity2":
          {},
      },
    },
    sku: { name: "Standard" },
    tags: { Category: "Marketing" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await configurationStoresUpdate();
  await configurationStoresUpdateDisableLocalAuth();
  await configurationStoresUpdateWithIdentity();
}

main().catch(console.error);
