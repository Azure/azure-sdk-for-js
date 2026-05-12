// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a natGateway tags.
 *
 * @summary updates a natGateway tags.
 * x-ms-original-file: 2026-04-01-preview/NatGateways_UpdateTags.json
 */
async function updateNatGatewayTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.natGateways.updateTags("testrg", "testnatgw", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateNatGatewayTags();
}

main().catch(console.error);
