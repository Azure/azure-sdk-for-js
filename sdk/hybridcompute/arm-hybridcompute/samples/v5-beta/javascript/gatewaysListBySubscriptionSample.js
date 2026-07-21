// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to get all gateways of a non-Azure machine
 *
 * @summary the operation to get all gateways of a non-Azure machine
 * x-ms-original-file: 2025-09-16-preview/gateway/Gateway_ListBySubscription.json
 */
async function listGatewaysBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffd506c8-3415-42d3-9612-fdb423fb17df";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.gateways.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listGatewaysBySubscription();
}

main().catch(console.error);
