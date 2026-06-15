// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to delete a gateway.
 *
 * @summary the operation to delete a gateway.
 * x-ms-original-file: 2025-09-16-preview/gateway/Gateway_Delete.json
 */
async function deleteAGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffd506c8-3415-42d3-9612-fdb423fb17df";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  await client.gateways.delete("myResourceGroup", "{gatewayName}");
}

async function main() {
  await deleteAGateway();
}

main().catch(console.error);
