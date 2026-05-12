// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to delete a loadBalancer.
 *
 * @summary the operation to delete a loadBalancer.
 * x-ms-original-file: 2026-04-01-preview/LoadBalancers_Delete.json
 */
async function deleteLoadBalancers(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  await client.loadBalancers.delete("test-rg", "test-lb");
}

async function main(): Promise<void> {
  await deleteLoadBalancers();
}

main().catch(console.error);
