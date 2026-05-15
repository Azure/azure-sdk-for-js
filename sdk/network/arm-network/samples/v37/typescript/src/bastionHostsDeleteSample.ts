// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified Bastion Host.
 *
 * @summary deletes the specified Bastion Host.
 * x-ms-original-file: 2025-05-01/BastionHostDelete.json
 */
async function deleteBastionHost(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.bastionHosts.delete("rg1", "bastionhosttenant");
}

/**
 * This sample demonstrates how to deletes the specified Bastion Host.
 *
 * @summary deletes the specified Bastion Host.
 * x-ms-original-file: 2025-05-01/BastionHostDeveloperDelete.json
 */
async function deleteDeveloperBastionHost(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.bastionHosts.delete("rg2", "bastionhostdeveloper");
}

async function main(): Promise<void> {
  await deleteBastionHost();
  await deleteDeveloperBastionHost();
}

main().catch(console.error);
