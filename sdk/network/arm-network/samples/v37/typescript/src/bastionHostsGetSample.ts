// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified Bastion Host.
 *
 * @summary gets the specified Bastion Host.
 * x-ms-original-file: 2025-05-01/BastionHostDeveloperGet.json
 */
async function getDeveloperBastionHost(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.bastionHosts.get("rg1", "bastionhostdeveloper'");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified Bastion Host.
 *
 * @summary gets the specified Bastion Host.
 * x-ms-original-file: 2025-05-01/BastionHostGet.json
 */
async function getBastionHost(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.bastionHosts.get("rg1", "bastionhosttenant'");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified Bastion Host.
 *
 * @summary gets the specified Bastion Host.
 * x-ms-original-file: 2025-05-01/BastionHostGetWithPrivateOnly.json
 */
async function getBastionHostWithPrivateOnly(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.bastionHosts.get("rg1", "bastionhosttenant");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified Bastion Host.
 *
 * @summary gets the specified Bastion Host.
 * x-ms-original-file: 2025-05-01/BastionHostGetWithZones.json
 */
async function getBastionHostWithZones(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.bastionHosts.get("rg1", "bastionhosttenant");
  console.log(result);
}

async function main(): Promise<void> {
  await getDeveloperBastionHost();
  await getBastionHost();
  await getBastionHostWithPrivateOnly();
  await getBastionHostWithZones();
}

main().catch(console.error);
