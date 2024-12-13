// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a SchemaVersion
 *
 * @summary delete a SchemaVersion
 * x-ms-original-file: 2024-09-01-preview/Delete_SchemaVersion.json
 */
async function deleteSchemaVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.schemaVersions.delete("myResourceGroup", "my-schema-registry", "my-schema", "1");
}

async function main() {
  deleteSchemaVersion();
}

main().catch(console.error);
