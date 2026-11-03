// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates PrivateEndpointConnections of service namespace.
 *
 * @summary creates or updates PrivateEndpointConnections of service namespace.
 * x-ms-original-file: 2026-01-01/NameSpaces/PrivateEndPointConnectionCreate.json
 */
async function nameSpacePrivateEndPointConnectionCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subID";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.createOrUpdate(
    "ArunMonocle",
    "sdk-Namespace-2924",
    "privateEndpointConnectionName",
    {
      privateEndpoint: {
        id: "/subscriptions/dbedb4e0-40e6-4145-81f3-f1314c150774/resourceGroups/SDK-EventHub-8396/providers/Microsoft.Network/privateEndpoints/sdk-Namespace-2847",
      },
      privateLinkServiceConnectionState: { description: "testing", status: "Rejected" },
      provisioningState: "Succeeded",
    },
  );
  console.log(result);
}

async function main() {
  await nameSpacePrivateEndPointConnectionCreate();
}

main().catch(console.error);
