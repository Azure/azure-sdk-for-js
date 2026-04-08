// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to a long-running resource action.
 *
 * @summary a long-running resource action.
 * x-ms-original-file: 2026-03-01-preview/NamespaceDevices_Revoke.json
 */
async function namespaceDevicesRevoke() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.namespaceDevices.revoke("rgdeviceregistry", "mynamespace", "device1", {
    disable: true,
  });
}

/**
 * This sample demonstrates how to a long-running resource action.
 *
 * @summary a long-running resource action.
 * x-ms-original-file: 2026-03-01-preview/NamespaceDevices_RevokeFailure.json
 */
async function namespaceDevicesRevokeFailure() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.namespaceDevices.revoke("rgdeviceregistry", "mynamespace", "device1", {
    disable: true,
  });
}

async function main() {
  await namespaceDevicesRevoke();
  await namespaceDevicesRevokeFailure();
}

main().catch(console.error);
