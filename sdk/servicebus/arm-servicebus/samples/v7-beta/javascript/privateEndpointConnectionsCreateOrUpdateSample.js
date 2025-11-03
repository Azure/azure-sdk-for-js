// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates PrivateEndpointConnections of service namespace.
 *
 * @summary creates or updates PrivateEndpointConnections of service namespace.
 * x-ms-original-file: 2025-05-01-preview/NameSpaces/PrivateEndPointConnectionCreate.json
 */
async function nameSpacePrivateEndPointConnectionCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.createOrUpdate(
    "ArunMonocle",
    "sdk-Namespace-2924",
    "privateEndpointConnectionName",
    {
      properties: {
        privateEndpoint: {
          id: "/subscriptions/dbedb4e0-40e6-4145-81f3-f1314c150774/resourceGroups/SDK-ServiceBus-8396/providers/Microsoft.Network/privateEndpoints/sdk-Namespace-2847",
        },
        privateLinkServiceConnectionState: {
          description: "testing",
          status: "Rejected",
        },
        provisioningState: "Succeeded",
      },
    },
  );
  console.log(result);
}

async function main() {
  await nameSpacePrivateEndPointConnectionCreate();
}

main().catch(console.error);
