// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppConfigurationManagementClient } from "@azure/arm-appconfiguration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a configuration store with the specified parameters.
 *
 * @summary creates a configuration store with the specified parameters.
 * x-ms-original-file: 2025-06-01-preview/ConfigurationStoresCreate.json
 */
async function configurationStoresCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.configurationStores.create("myResourceGroup", "contoso", {
    location: "westus",
    sku: { name: "Standard" },
    tags: { myTag: "myTagValue" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a configuration store with the specified parameters.
 *
 * @summary creates a configuration store with the specified parameters.
 * x-ms-original-file: 2025-06-01-preview/ConfigurationStoresCreateWithAzureFrontDoor.json
 */
async function configurationStoresCreateWithAzureFrontDoor(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.configurationStores.create("myResourceGroup", "contoso", {
    location: "westus",
    sku: { name: "Standard" },
    tags: { myTag: "myTagValue" },
    azureFrontDoor: {
      resourceId:
        "/subscriptions/c80fb759-c965-4c6a-9110-9b2b2d038882/resourceGroups/myResourceGroup/providers/microsoft.cdn/profiles/myAzureFrontDoorProfile",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a configuration store with the specified parameters.
 *
 * @summary creates a configuration store with the specified parameters.
 * x-ms-original-file: 2025-06-01-preview/ConfigurationStoresCreateWithDataPlaneProxy.json
 */
async function configurationStoresCreateWithDataPlaneProxy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.configurationStores.create("myResourceGroup", "contoso", {
    location: "westus",
    dataPlaneProxy: { authenticationMode: "Pass-through", privateLinkDelegation: "Enabled" },
    sku: { name: "Standard" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a configuration store with the specified parameters.
 *
 * @summary creates a configuration store with the specified parameters.
 * x-ms-original-file: 2025-06-01-preview/ConfigurationStoresCreateWithIdentity.json
 */
async function configurationStoresCreateWithIdentity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.configurationStores.create("myResourceGroup", "contoso", {
    identity: {
      type: "SystemAssigned, UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/c80fb759-c965-4c6a-9110-9b2b2d038882/resourcegroups/myResourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity2":
          {},
      },
    },
    location: "westus",
    sku: { name: "Standard" },
    tags: { myTag: "myTagValue" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a configuration store with the specified parameters.
 *
 * @summary creates a configuration store with the specified parameters.
 * x-ms-original-file: 2025-06-01-preview/ConfigurationStoresCreateWithLocalAuthDisabled.json
 */
async function configurationStoresCreateWithLocalAuthDisabled(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.configurationStores.create("myResourceGroup", "contoso", {
    location: "westus",
    dataPlaneProxy: { authenticationMode: "Pass-through", privateLinkDelegation: "Disabled" },
    disableLocalAuth: true,
    sku: { name: "Standard" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a configuration store with the specified parameters.
 *
 * @summary creates a configuration store with the specified parameters.
 * x-ms-original-file: 2025-06-01-preview/ConfigurationStoresCreateWithTelemetry.json
 */
async function configurationStoresCreateWithTelemetry(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.configurationStores.create("myResourceGroup", "contoso", {
    location: "westus",
    telemetry: {
      resourceId:
        "/subscriptions/c80fb759-c965-4c6a-9110-9b2b2d038882/resourceGroups/myResourceGroup/providers/microsoft.insights/components/appInsightsName",
    },
    sku: { name: "Standard" },
    tags: { myTag: "myTagValue" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await configurationStoresCreate();
  await configurationStoresCreateWithAzureFrontDoor();
  await configurationStoresCreateWithDataPlaneProxy();
  await configurationStoresCreateWithIdentity();
  await configurationStoresCreateWithLocalAuthDisabled();
  await configurationStoresCreateWithTelemetry();
}

main().catch(console.error);
