// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a SchemaRegistry
 *
 * @summary delete a SchemaRegistry
 * x-ms-original-file: 2024-09-01-preview/Delete_SchemaRegistry.json
 */
async function deleteSchemaRegistry() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.schemaRegistries.delete("myResourceGroup", "my-schema-registry");
}

async function main() {
  deleteSchemaRegistry();
}

main().catch(console.error);
