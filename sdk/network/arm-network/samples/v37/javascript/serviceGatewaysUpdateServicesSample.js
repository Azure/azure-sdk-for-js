// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates, updates, or deletes services within the service gateway.
 * The request supports both full and partial update modes at the service level.
 *
 * Full update replaces all existing services with the new list provided in the request.
 * Partial update modifies only the specified services.
 *
 * @summary creates, updates, or deletes services within the service gateway.
 * The request supports both full and partial update modes at the service level.
 *
 * Full update replaces all existing services with the new list provided in the request.
 * Partial update modifies only the specified services.
 * x-ms-original-file: 2025-05-01/ServiceGatewayUpdateServicesRequest.json
 */
async function createOrFullUpdateServicesInServiceGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.serviceGateways.updateServices("rg1", "sg", {
    action: "FullUpdate",
    serviceRequests: [
      {
        service: {
          name: "Service1",
          isDefault: true,
          loadBalancerBackendPools: [
            {
              id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb1/backendAddressPools/be1",
            },
          ],
          publicNatGatewayId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/natGateways/test-natGateway",
          serviceType: "Inbound",
        },
      },
      { isDelete: true, service: { name: "Service2", isDefault: false, serviceType: "Outbound" } },
    ],
  });
}

async function main() {
  await createOrFullUpdateServicesInServiceGateway();
}

main().catch(console.error);
