// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Namespace
 *
 * @summary update a Namespace
 * x-ms-original-file: 2026-11-01/Update_Namespace_ManagementEndpoints.json
 */
async function linkANamespaceToAManagementEndpoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.namespaces.update("myResourceGroup", "adr-namespace-gbk0925-n01", {
    properties: {
      management: {
        endpoints: {
          customLocation1: {
            endpointType: "Microsoft.EventGrid/Namespaces",
            address: "eg-for-adr.eastus2-1.ts.eventgrid.azure.net",
            scopeId: "scope-id-for-management-endpoint-1",
            resourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.EventGrid/Namespaces/eg-for-adr",
          },
        },
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a Namespace
 *
 * @summary update a Namespace
 * x-ms-original-file: 2026-11-01/Update_Namespace_MessagingEndpoints.json
 */
async function linkANamespaceToAMessagingEndpoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.namespaces.update("myResourceGroup", "mynamespace", {
    properties: {
      messaging: {
        endpoints: {
          myPrimaryIotHubEndpoint: {
            endpointType: "Microsoft.Devices/IotHubs",
            resourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Devices/IotHubs/myIotHub1",
            inboundCallerIdentity: { type: "SystemAssigned" },
            provisioning: { availability: "Available", allocationWeight: 1 },
          },
          mySecondaryIotHubEndpoint: {
            endpointType: "Microsoft.Devices/IotHubs",
            resourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Devices/IotHubs/myIotHub2",
            inboundCallerIdentity: { type: "SystemAssigned" },
            provisioning: { availability: "Available", allocationWeight: 1 },
          },
        },
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a Namespace
 *
 * @summary update a Namespace
 * x-ms-original-file: 2026-11-01/Update_Namespace_ProvisioningEndpoints.json
 */
async function linkANamespaceToAProvisioningEndpoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.namespaces.update("myResourceGroup", "mynamespace", {
    properties: {
      provisioning: {
        endpoints: {
          myDpsEndpoint: {
            endpointType: "Microsoft.Devices/provisioningServices",
            resourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Devices/provisioningServices/myDps",
            inboundCallerIdentity: { type: "SystemAssigned" },
          },
        },
      },
    },
  });
  console.log(result);
}

async function main() {
  await linkANamespaceToAManagementEndpoint();
  await linkANamespaceToAMessagingEndpoint();
  await linkANamespaceToAProvisioningEndpoint();
}

main().catch(console.error);
