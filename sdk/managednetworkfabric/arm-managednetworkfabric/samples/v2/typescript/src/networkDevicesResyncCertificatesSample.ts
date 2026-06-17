// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the Network Device to use the latest certificates. Does not generate new certificates. Allows network devices missed during a previous certificate rotation to be brought back into sync.
 *
 * @summary updates the Network Device to use the latest certificates. Does not generate new certificates. Allows network devices missed during a previous certificate rotation to be brought back into sync.
 * x-ms-original-file: 2025-07-15/NetworkDevices_ResyncCertificates.json
 */
async function successfulCertificateResync(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkDevices.resyncCertificates("example-rg", "example-device");
  console.log(result);
}

/**
 * This sample demonstrates how to updates the Network Device to use the latest certificates. Does not generate new certificates. Allows network devices missed during a previous certificate rotation to be brought back into sync.
 *
 * @summary updates the Network Device to use the latest certificates. Does not generate new certificates. Allows network devices missed during a previous certificate rotation to be brought back into sync.
 * x-ms-original-file: 2025-07-15/NetworkDevices_ResyncCertificates_Error.json
 */
async function errorWhilePerformingCertificateResync(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkDevices.resyncCertificates("example-rg", "example-device");
  console.log(result);
}

async function main(): Promise<void> {
  await successfulCertificateResync();
  await errorWhilePerformingCertificateResync();
}

main().catch(console.error);
