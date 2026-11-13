// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a private endpoint connection. Until the connection is removed, `properties.provisioningState` is `Deleting`.
 *
 * @summary deletes a private endpoint connection. Until the connection is removed, `properties.provisioningState` is `Deleting`.
 * x-ms-original-file: 2026-11-01/AiGatewayPrivateEndpointConnectionDelete.json
 */
async function deleteAPrivateEndpointConnectionForAnAIGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.aiGatewayPrivateEndpointConnections.delete(
    "example-rg",
    "example-gateway",
    "33333333-3333-3333-3333-333333333333",
  );
}

async function main(): Promise<void> {
  await deleteAPrivateEndpointConnectionForAnAIGateway();
}

main().catch(console.error);
