// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to update a gateway.
 *
 * @summary the operation to update a gateway.
 * x-ms-original-file: 2026-06-16-preview/gateway/Gateway_Update.json
 */
async function updateAGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffd506c8-3415-42d3-9612-fdb423fb17df";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.gateways.update("myResourceGroup", "{gatewayName}", {
    allowedFeatures: ["*"],
    gatewayBypass: ["contoso.com", "internal.corp.net"],
  });
  console.log(result);
}

async function main() {
  await updateAGateway();
}

main().catch(console.error);
