// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to create or update a gateway.
 *
 * @summary the operation to create or update a gateway.
 * x-ms-original-file: 2026-06-16-preview/gateway/Gateway_CreateOrUpdate.json
 */
async function createOrUpdateAGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffd506c8-3415-42d3-9612-fdb423fb17df";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.gateways.createOrUpdate("myResourceGroup", "{gatewayName}", {
    location: "eastus2euap",
    allowedFeatures: ["*"],
    gatewayType: "Public",
    gatewayBypass: ["contoso.com", "internal.corp.net"],
  });
  console.log(result);
}

async function main() {
  await createOrUpdateAGateway();
}

main().catch(console.error);
