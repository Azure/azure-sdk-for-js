// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the Network Device to use the latest passwords. Does not generate new passwords. Allows network devices missed during a previous password rotation to be brought back into sync.
 *
 * @summary updates the Network Device to use the latest passwords. Does not generate new passwords. Allows network devices missed during a previous password rotation to be brought back into sync.
 * x-ms-original-file: 2025-07-15/NetworkDevices_ResyncPasswords.json
 */
async function successfulPasswordResync(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkDevices.resyncPasswords("example-rg", "example-device");
  console.log(result);
}

/**
 * This sample demonstrates how to updates the Network Device to use the latest passwords. Does not generate new passwords. Allows network devices missed during a previous password rotation to be brought back into sync.
 *
 * @summary updates the Network Device to use the latest passwords. Does not generate new passwords. Allows network devices missed during a previous password rotation to be brought back into sync.
 * x-ms-original-file: 2025-07-15/NetworkDevices_ResyncPasswords_Error.json
 */
async function errorWhilePerformingPasswordResync(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkDevices.resyncPasswords("example-rg", "example-device");
  console.log(result);
}

async function main(): Promise<void> {
  await successfulPasswordResync();
  await errorWhilePerformingPasswordResync();
}

main().catch(console.error);
