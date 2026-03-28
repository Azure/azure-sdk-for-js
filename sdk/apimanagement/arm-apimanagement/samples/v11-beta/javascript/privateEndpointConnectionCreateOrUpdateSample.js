// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new Private Endpoint Connection or updates an existing one.
 *
 * @summary creates a new Private Endpoint Connection or updates an existing one.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementApproveOrRejectPrivateEndpointConnection.json
 */
async function apiManagementApproveOrRejectPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnection.createOrUpdate(
    "rg1",
    "apimService1",
    "privateEndpointConnectionName",
    {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/privateEndpointConnections/connectionName",
      properties: {
        privateLinkServiceConnectionState: {
          description: "The Private Endpoint Connection is approved.",
          status: "Approved",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await apiManagementApproveOrRejectPrivateEndpointConnection();
}

main().catch(console.error);
