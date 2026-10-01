// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing namespace. This operation also removes all associated resources under the namespace.
 *
 * @summary deletes an existing namespace. This operation also removes all associated resources under the namespace.
 * x-ms-original-file: 2026-01-01/NameSpaces/PrivateEndPointConnectionDelete.json
 */
async function nameSpacePrivateEndPointConnectionDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "ArunMonocle",
    "sdk-Namespace-3285",
    "928c44d5-b7c6-423b-b6fa-811e0c27b3e0",
  );
}

async function main(): Promise<void> {
  await nameSpacePrivateEndPointConnectionDelete();
}

main().catch(console.error);
