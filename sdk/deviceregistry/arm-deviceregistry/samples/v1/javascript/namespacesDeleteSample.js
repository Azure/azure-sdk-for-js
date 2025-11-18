// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Namespace
 *
 * @summary delete a Namespace
 * x-ms-original-file: 2025-10-01/Delete_Namespace.json
 */
async function deleteNamespace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.namespaces.delete("myResourceGroup", "adr-namespace-gbk0925-n01");
}

async function main() {
  await deleteNamespace();
}

main().catch(console.error);
