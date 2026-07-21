// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to update a gateway.
 *
 * @summary the operation to update a gateway.
 * x-ms-original-file: 2025-09-16-preview/gateway/Gateway_Update.json
 */
async function updateAGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffd506c8-3415-42d3-9612-fdb423fb17df";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.gateways.update("myResourceGroup", "{gatewayName}", {
    allowedFeatures: ["*"],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateAGateway();
}

main().catch(console.error);
