// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to delete a gateway.
 *
 * @summary the operation to delete a gateway.
 * x-ms-original-file: 2026-06-16-preview/gateway/Gateway_Delete.json
 */
async function deleteAGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffd506c8-3415-42d3-9612-fdb423fb17df";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  await client.gateways.delete("myResourceGroup", "{gatewayName}");
}

async function main(): Promise<void> {
  await deleteAGateway();
}

main().catch(console.error);
