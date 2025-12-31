// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a SchemaVersion
 *
 * @summary delete a SchemaVersion
 * x-ms-original-file: 2025-10-01/Delete_SchemaVersion.json
 */
async function deleteSchemaVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.schemaVersions.delete("myResourceGroup", "my-schema-registry", "my-schema", "1");
}

async function main() {
  await deleteSchemaVersion();
}

main().catch(console.error);
