// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BatchManagementClient } = require("@azure/arm-batch");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the properties of an existing private endpoint connection.
 *
 * @summary updates the properties of an existing private endpoint connection.
 * x-ms-original-file: 2025-06-01/PrivateEndpointConnectionUpdate.json
 */
async function updatePrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnection.update(
    "default-azurebatch-japaneast",
    "sampleacct",
    "testprivateEndpointConnection5.24d6b4b5-e65c-4330-bbe9-3a290d62f8e0",
    {
      privateLinkServiceConnectionState: {
        description: "Approved by xyz.abc@company.com",
        status: "Approved",
      },
    },
  );
  console.log(result);
}

async function main() {
  await updatePrivateEndpointConnection();
}

main().catch(console.error);
