// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to perform a long-running resource action.
 *
 * @summary perform a long-running resource action.
 * x-ms-original-file: 2026-03-01-preview/NamespaceDevices_Revoke.json
 */
async function namespaceDevicesRevoke(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.namespaceDevices.revoke("rgdeviceregistry", "mynamespace", "device1", {
    disable: true,
  });
}

/**
 * This sample demonstrates how to perform a long-running resource action.
 *
 * @summary perform a long-running resource action.
 * x-ms-original-file: 2026-03-01-preview/NamespaceDevices_RevokeFailure.json
 */
async function namespaceDevicesRevokeFailure(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.namespaceDevices.revoke("rgdeviceregistry", "mynamespace", "device1", {
    disable: true,
  });
}

async function main(): Promise<void> {
  await namespaceDevicesRevoke();
  await namespaceDevicesRevokeFailure();
}

main().catch(console.error);
