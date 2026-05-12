// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to get a natGateway.
 *
 * @summary the operation to get a natGateway.
 * x-ms-original-file: 2026-04-01-preview/NatGateways_Get.json
 */
async function getNatGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.natGateways.get("test-rg", "test-nat-gw");
  console.log(result);
}

async function main(): Promise<void> {
  await getNatGateway();
}

main().catch(console.error);
