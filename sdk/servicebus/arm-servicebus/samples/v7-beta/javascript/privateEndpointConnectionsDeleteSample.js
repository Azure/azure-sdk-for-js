// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing Private Endpoint Connection.
 *
 * @summary deletes an existing Private Endpoint Connection.
 * x-ms-original-file: 2025-05-01-preview/NameSpaces/PrivateEndPointConnectionDelete.json
 */
async function nameSpacePrivateEndPointConnectionDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "ArunMonocle",
    "sdk-Namespace-3285",
    "928c44d5-b7c6-423b-b6fa-811e0c27b3e0",
  );
}

async function main() {
  await nameSpacePrivateEndPointConnectionDelete();
}

main().catch(console.error);
