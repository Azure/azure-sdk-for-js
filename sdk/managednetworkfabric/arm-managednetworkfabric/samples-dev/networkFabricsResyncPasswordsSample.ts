// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the Terminal Server and all Network Devices to use the latest passwords. Does not generate new passwords.
 *
 * Allows devices to be brought back in sync after a partially successful password rotation.
 *
 * @summary updates the Terminal Server and all Network Devices to use the latest passwords. Does not generate new passwords.
 *
 * Allows devices to be brought back in sync after a partially successful password rotation.
 * x-ms-original-file: 2025-07-15/NetworkFabrics_ResyncPasswords.json
 */
async function successfulPasswordResyncForTheTerminalServerAndAllNetworkDevices(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkFabrics.resyncPasswords("example-rg", "example-fabric");
  console.log(result);
}

/**
 * This sample demonstrates how to updates the Terminal Server and all Network Devices to use the latest passwords. Does not generate new passwords.
 *
 * Allows devices to be brought back in sync after a partially successful password rotation.
 *
 * @summary updates the Terminal Server and all Network Devices to use the latest passwords. Does not generate new passwords.
 *
 * Allows devices to be brought back in sync after a partially successful password rotation.
 * x-ms-original-file: 2025-07-15/NetworkFabrics_ResyncPasswords_Error.json
 */
async function totalFailureToResyncPasswords(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkFabrics.resyncPasswords("example-rg", "example-fabric");
  console.log(result);
}

/**
 * This sample demonstrates how to updates the Terminal Server and all Network Devices to use the latest passwords. Does not generate new passwords.
 *
 * Allows devices to be brought back in sync after a partially successful password rotation.
 *
 * @summary updates the Terminal Server and all Network Devices to use the latest passwords. Does not generate new passwords.
 *
 * Allows devices to be brought back in sync after a partially successful password rotation.
 * x-ms-original-file: 2025-07-15/NetworkFabrics_ResyncPasswords_PartialSuccess.json
 */
async function partialFailureToResyncPasswordsForSomeDevices(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkFabrics.resyncPasswords("example-rg", "example-fabric");
  console.log(result);
}

async function main(): Promise<void> {
  await successfulPasswordResyncForTheTerminalServerAndAllNetworkDevices();
  await totalFailureToResyncPasswords();
  await partialFailureToResyncPasswordsForSomeDevices();
}

main().catch(console.error);
