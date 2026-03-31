// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified service gateway.
 *
 * @summary deletes the specified service gateway.
 * x-ms-original-file: 2025-05-01/ServiceGatewayDelete.json
 */
async function deleteServiceGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.serviceGateways.delete("rg1", "sg");
}

async function main(): Promise<void> {
  await deleteServiceGateway();
}

main().catch(console.error);
