// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified nat gateway.
 *
 * @summary deletes the specified nat gateway.
 * x-ms-original-file: 2025-05-01/NatGatewayDelete.json
 */
async function deleteNatGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.natGateways.delete("rg1", "test-natGateway");
}

async function main(): Promise<void> {
  await deleteNatGateway();
}

main().catch(console.error);
