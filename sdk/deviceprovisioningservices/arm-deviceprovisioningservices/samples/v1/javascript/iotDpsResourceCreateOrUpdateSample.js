// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotDpsClient } = require("@azure/arm-deviceprovisioningservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update the metadata of the provisioning service. The usual pattern to modify a property is to retrieve the provisioning service metadata and security metadata, and then combine them with the modified values in a new body to update the provisioning service.
 *
 * @summary create or update the metadata of the provisioning service. The usual pattern to modify a property is to retrieve the provisioning service metadata and security metadata, and then combine them with the modified values in a new body to update the provisioning service.
 * x-ms-original-file: 2026-08-31/DPSCreate.json
 */
async function dpsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.iotDpsResource.createOrUpdate(
    "myResourceGroup",
    "myFirstProvisioningService",
    {
      location: "East US",
      properties: { enableDataResidency: false },
      sku: { name: "S1", capacity: 1 },
      tags: {},
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update the metadata of the provisioning service. The usual pattern to modify a property is to retrieve the provisioning service metadata and security metadata, and then combine them with the modified values in a new body to update the provisioning service.
 *
 * @summary create or update the metadata of the provisioning service. The usual pattern to modify a property is to retrieve the provisioning service metadata and security metadata, and then combine them with the modified values in a new body to update the provisioning service.
 * x-ms-original-file: 2026-08-31/DPSCreateWithIotHub.json
 */
async function dpsCreateWithIotHub() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.iotDpsResource.createOrUpdate(
    "myResourceGroup",
    "myFirstProvisioningService",
    {
      location: "East US",
      properties: {
        enableDataResidency: false,
        iotHubs: [
          {
            applyAllocationPolicy: true,
            allocationWeight: 1,
            hostName: "myFirstIoTHub.azure-devices.net",
            authenticationType: "UserAssigned",
            selectedUserAssignedIdentityResourceId:
              "/subscriptions/abcf2d55-764f-419f-974d-f77a55c2ce55/resourcegroups/my-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/my-mi-1",
            location: "eastus",
          },
        ],
      },
      sku: { name: "S1", capacity: 1 },
      identity: {
        type: "SystemAssigned, UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/abcf2d55-764f-419f-974d-f77a55c2ce55/resourcegroups/my-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/my-mi-1":
            {},
        },
      },
      tags: {},
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update the metadata of the provisioning service. The usual pattern to modify a property is to retrieve the provisioning service metadata and security metadata, and then combine them with the modified values in a new body to update the provisioning service.
 *
 * @summary create or update the metadata of the provisioning service. The usual pattern to modify a property is to retrieve the provisioning service metadata and security metadata, and then combine them with the modified values in a new body to update the provisioning service.
 * x-ms-original-file: 2026-08-31/DPSCreateWithNamespace.json
 */
async function dpsCreateWithNamespace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.iotDpsResource.createOrUpdate(
    "myResourceGroup",
    "myFirstProvisioningService",
    {
      location: "East US",
      properties: { enableDataResidency: false },
      sku: { name: "S1", capacity: 1 },
      tags: {},
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update the metadata of the provisioning service. The usual pattern to modify a property is to retrieve the provisioning service metadata and security metadata, and then combine them with the modified values in a new body to update the provisioning service.
 *
 * @summary create or update the metadata of the provisioning service. The usual pattern to modify a property is to retrieve the provisioning service metadata and security metadata, and then combine them with the modified values in a new body to update the provisioning service.
 * x-ms-original-file: 2026-08-31/DPSCreate_DisableLocalAuthFalse.json
 */
async function dpsCreateDisableLocalAuthFalse() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.iotDpsResource.createOrUpdate(
    "myResourceGroup",
    "myFirstProvisioningService",
    {
      location: "East US",
      properties: { publicNetworkAccess: "Enabled", disableLocalAuth: false },
      sku: { name: "S1", capacity: 1 },
      tags: { key1: "value1" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update the metadata of the provisioning service. The usual pattern to modify a property is to retrieve the provisioning service metadata and security metadata, and then combine them with the modified values in a new body to update the provisioning service.
 *
 * @summary create or update the metadata of the provisioning service. The usual pattern to modify a property is to retrieve the provisioning service metadata and security metadata, and then combine them with the modified values in a new body to update the provisioning service.
 * x-ms-original-file: 2026-08-31/DPSCreate_DisableLocalAuthTrue.json
 */
async function dpsCreateDisableLocalAuthTrue() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.iotDpsResource.createOrUpdate(
    "myResourceGroup",
    "myFirstProvisioningService",
    {
      location: "East US",
      properties: { publicNetworkAccess: "Enabled", disableLocalAuth: true },
      sku: { name: "S1", capacity: 1 },
      tags: { key1: "value1", key2: "value2" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update the metadata of the provisioning service. The usual pattern to modify a property is to retrieve the provisioning service metadata and security metadata, and then combine them with the modified values in a new body to update the provisioning service.
 *
 * @summary create or update the metadata of the provisioning service. The usual pattern to modify a property is to retrieve the provisioning service metadata and security metadata, and then combine them with the modified values in a new body to update the provisioning service.
 * x-ms-original-file: 2026-08-31/DPSUpdate.json
 */
async function dpsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.iotDpsResource.createOrUpdate(
    "myResourceGroup",
    "myFirstProvisioningService",
    {
      identity: {
        type: "SystemAssigned,UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/91d12660-3dec-467a-be2a-213b5544ddc0/resourcegroups/testrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testidentity":
            {},
        },
      },
      location: "East US",
      properties: { enableDataResidency: false },
      sku: { name: "S1", capacity: 1 },
      tags: {},
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update the metadata of the provisioning service. The usual pattern to modify a property is to retrieve the provisioning service metadata and security metadata, and then combine them with the modified values in a new body to update the provisioning service.
 *
 * @summary create or update the metadata of the provisioning service. The usual pattern to modify a property is to retrieve the provisioning service metadata and security metadata, and then combine them with the modified values in a new body to update the provisioning service.
 * x-ms-original-file: 2026-08-31/DPSUpdate_DisableLocalAuth.json
 */
async function dpsUpdateDisableLocalAuth() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.iotDpsResource.createOrUpdate(
    "myResourceGroup",
    "myFirstProvisioningService",
    {
      location: "East US",
      properties: { disableLocalAuth: true },
      sku: { name: "S1", capacity: 1 },
      tags: {},
    },
  );
  console.log(result);
}

async function main() {
  await dpsCreate();
  await dpsCreateWithIotHub();
  await dpsCreateWithNamespace();
  await dpsCreateDisableLocalAuthFalse();
  await dpsCreateDisableLocalAuthTrue();
  await dpsUpdate();
  await dpsUpdateDisableLocalAuth();
}

main().catch(console.error);
