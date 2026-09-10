// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Namespace
 *
 * @summary create a Namespace
 * x-ms-original-file: 2026-11-01/CreateOrReplace_Namespace_With_ManagementEndpoints.json
 */
async function createOrReplaceANamespaceWithManagementEndpoints(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.namespaces.createOrReplace(
    "myResourceGroup",
    "adr-namespace-gbk0925-n01",
    {
      location: "North Europe",
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
            customLocation2: {
              endpointType: "Microsoft.EventGrid/Namespaces",
              address: "eg-for-adr1.eastus2-1.ts.eventgrid.azure.net",
              scopeId: "scope-id-for-management-endpoint-2",
              resourceId:
                "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.EventGrid/Namespaces/eg-for-adr1",
            },
          },
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a Namespace
 *
 * @summary create a Namespace
 * x-ms-original-file: 2026-11-01/CreateOrReplace_Namespace_With_MessagingAndProvisioningEndpoints.json
 */
async function createOrReplaceANamespaceWithLinkedMessagingAndProvisioningEndpoints(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.namespaces.createOrReplace("myResourceGroup", "mynamespace", {
    location: "northeurope",
    identity: { type: "SystemAssigned" },
    properties: {
      messaging: {
        endpoints: {
          myPrimaryIotHubEndpoint: {
            endpointType: "Microsoft.Devices/IotHubs",
            resourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Devices/IotHubs/myIotHub1",
            inboundCallerIdentity: { type: "SystemAssigned" },
          },
          mySecondaryIotHubEndpoint: {
            endpointType: "Microsoft.Devices/IotHubs",
            resourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Devices/IotHubs/myIotHub2",
            inboundCallerIdentity: {
              type: "UserAssigned",
              userAssignedIdentity:
                "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myAdrCallerUami",
            },
          },
        },
      },
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

async function main(): Promise<void> {
  await createOrReplaceANamespaceWithManagementEndpoints();
  await createOrReplaceANamespaceWithLinkedMessagingAndProvisioningEndpoints();
}

main().catch(console.error);
