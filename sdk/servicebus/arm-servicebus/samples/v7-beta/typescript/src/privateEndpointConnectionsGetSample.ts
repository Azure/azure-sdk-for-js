// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a description for the specified Private Endpoint Connection.
 *
 * @summary gets a description for the specified Private Endpoint Connection.
 * x-ms-original-file: 2025-05-01-preview/NameSpaces/PrivateEndPointConnectionGet.json
 */
async function nameSpacePrivateEndPointConnectionGet(): Promise<void> {
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

async function main(): Promise<void> {
  await nameSpacePrivateEndPointConnectionGet();
}

main().catch(console.error);
