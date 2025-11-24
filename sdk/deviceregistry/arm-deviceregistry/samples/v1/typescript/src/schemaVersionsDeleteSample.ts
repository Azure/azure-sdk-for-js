// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a SchemaVersion
 *
 * @summary delete a SchemaVersion
 * x-ms-original-file: 2025-10-01/Delete_SchemaVersion.json
 */
async function deleteSchemaVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.schemaVersions.delete("myResourceGroup", "my-schema-registry", "my-schema", "1");
}

async function main(): Promise<void> {
  await deleteSchemaVersion();
}

main().catch(console.error);
