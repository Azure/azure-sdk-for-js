// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified public IP address.
 *
 * @summary deletes the specified public IP address.
 * x-ms-original-file: 2025-05-01/PublicIpAddressDelete.json
 */
async function deletePublicIPAddress(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.publicIPAddresses.delete("rg1", "test-ip");
}

async function main(): Promise<void> {
  await deletePublicIPAddress();
}

main().catch(console.error);
