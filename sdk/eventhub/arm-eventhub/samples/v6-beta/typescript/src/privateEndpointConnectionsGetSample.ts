// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a description for the specified Private Endpoint Connection name.
 *
 * @summary gets a description for the specified Private Endpoint Connection name.
 * x-ms-original-file: 2026-01-01/NameSpaces/PrivateEndPointConnectionGet.json
 */
async function nameSpacePrivateEndPointConnectionGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subID";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "SDK-EventHub-4794",
    "sdk-Namespace-5828",
    "privateEndpointConnectionName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nameSpacePrivateEndPointConnectionGet();
}

main().catch(console.error);
