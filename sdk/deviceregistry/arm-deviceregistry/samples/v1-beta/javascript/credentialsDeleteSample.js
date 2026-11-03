// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Credential
 *
 * @summary delete a Credential
 * x-ms-original-file: 2026-03-01-preview/Delete_Credentials.json
 */
async function deleteCredentials() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.credentials.delete("rgdeviceregistry", "mynamespace");
}

async function main() {
  await deleteCredentials();
}

main().catch(console.error);
