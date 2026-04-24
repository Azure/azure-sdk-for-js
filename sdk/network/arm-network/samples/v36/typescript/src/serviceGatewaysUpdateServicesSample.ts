// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ServiceGatewayUpdateServicesRequest} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates, updates, or deletes services within the service gateway.
The request supports both full and partial update modes at the service level.

Full update replaces all existing services with the new list provided in the request.
Partial update modifies only the specified services.
 *
 * @summary Creates, updates, or deletes services within the service gateway.
The request supports both full and partial update modes at the service level.

Full update replaces all existing services with the new list provided in the request.
Partial update modifies only the specified services.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ServiceGatewayUpdateServicesRequest.json
 */
async function createOrFullUpdateServicesInServiceGateway(): Promise<void> {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const serviceGatewayName = "sg";
  const parameters: ServiceGatewayUpdateServicesRequest = {
    action: "FullUpdate",
    serviceRequests: [
      {
        service: {
          name: "Service1",
          isDefault: true,
          loadBalancerBackendPools: [
            {
              id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb1/backendAddressPools/be1",
            },
          ],
          publicNatGatewayId:
            "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/natGateways/test-natGateway",
          serviceType: "Inbound",
        },
      },
      {
        isDelete: true,
        service: {
          name: "Service2",
          isDefault: false,
          serviceType: "Outbound",
        },
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.serviceGateways.beginUpdateServicesAndWait(
    resourceGroupName,
    serviceGatewayName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrFullUpdateServicesInServiceGateway();
}

main().catch(console.error);
