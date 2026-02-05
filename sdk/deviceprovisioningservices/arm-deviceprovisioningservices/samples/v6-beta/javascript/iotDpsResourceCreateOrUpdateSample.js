// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotDpsClient } = require("@azure/arm-deviceprovisioningservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update the metadata of the provisioning service. The usual pattern to modify a property is to retrieve the provisioning service metadata and security metadata, and then combine them with the modified values in a new body to update the provisioning service.
 *
 * @summary create or update the metadata of the provisioning service. The usual pattern to modify a property is to retrieve the provisioning service metadata and security metadata, and then combine them with the modified values in a new body to update the provisioning service.
 * x-ms-original-file: 2025-02-01-preview/DPSCreate.json
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
 * x-ms-original-file: 2025-02-01-preview/DPSCreateWithNamespace.json
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
 * x-ms-original-file: 2025-02-01-preview/DPSUpdate.json
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

async function main() {
  await dpsCreate();
  await dpsCreateWithNamespace();
  await dpsUpdate();
}

main().catch(console.error);
