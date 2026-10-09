// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a AiGatewayResource
 *
 * @summary create a AiGatewayResource
 * x-ms-original-file: 2026-09-01-preview/AiGatewayCreate.json
 */
async function createAnAIGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayResources.createOrUpdate("example-rg", "example-gateway", {
    location: "westus2",
    tags: { environment: "development" },
    sku: { name: "AIGateway" },
    identity: { type: "SystemAssigned" },
    properties: {
      backend: {
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Network/virtualNetworks/example-vnet/subnets/example-subnet",
        },
      },
    },
  });
  console.log(result);
}

async function main() {
  await createAnAIGateway();
}

main().catch(console.error);
