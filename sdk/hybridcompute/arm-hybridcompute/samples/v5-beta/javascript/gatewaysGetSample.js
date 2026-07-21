// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves information about the view of a gateway.
 *
 * @summary retrieves information about the view of a gateway.
 * x-ms-original-file: 2025-09-16-preview/gateway/Gateway_Get.json
 */
async function getGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffd506c8-3415-42d3-9612-fdb423fb17df";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.gateways.get("myResourceGroup", "{gatewayName}");
  console.log(result);
}

async function main() {
  await getGateway();
}

main().catch(console.error);
