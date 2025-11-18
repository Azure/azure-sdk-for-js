// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a SchemaRegistry
 *
 * @summary delete a SchemaRegistry
 * x-ms-original-file: 2025-10-01/Delete_SchemaRegistry.json
 */
async function deleteSchemaRegistry(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.schemaRegistries.delete("myResourceGroup", "my-schema-registry");
}

async function main(): Promise<void> {
  await deleteSchemaRegistry();
}

main().catch(console.error);
