// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a description for the specified Private Endpoint Connection.
 *
 * @summary gets a description for the specified Private Endpoint Connection.
 * x-ms-original-file: 2025-05-01-preview/NameSpaces/PrivateEndPointConnectionGet.json
 */
async function nameSpacePrivateEndPointConnectionGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "SDK-ServiceBus-4794",
    "sdk-Namespace-5828",
    "privateEndpointConnectionName",
  );
  console.log(result);
}

async function main() {
  await nameSpacePrivateEndPointConnectionGet();
}

main().catch(console.error);
