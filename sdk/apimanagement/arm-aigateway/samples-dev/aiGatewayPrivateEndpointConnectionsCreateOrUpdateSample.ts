// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to approves or rejects a private endpoint connection. While the decision is applied, `properties.provisioningState` is `Updating`, a service-defined value of the extensible provisioning state.
 *
 * @summary approves or rejects a private endpoint connection. While the decision is applied, `properties.provisioningState` is `Updating`, a service-defined value of the extensible provisioning state.
 * x-ms-original-file: 2026-11-01/AiGatewayPrivateEndpointConnectionCreateOrUpdate.json
 */
async function approveOrRejectAPrivateEndpointConnectionForAnAIGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayPrivateEndpointConnections.createOrUpdate(
    "example-rg",
    "example-gateway",
    "33333333-3333-3333-3333-333333333333",
    {
      properties: {
        privateLinkServiceConnectionState: {
          status: "Approved",
          description: "Approved by administrator.",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await approveOrRejectAPrivateEndpointConnectionForAnAIGateway();
}

main().catch(console.error);
