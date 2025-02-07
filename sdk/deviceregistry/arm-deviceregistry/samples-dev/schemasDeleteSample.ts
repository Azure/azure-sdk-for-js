// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Schema
 *
 * @summary delete a Schema
 * x-ms-original-file: 2024-09-01-preview/Delete_Schema.json
 */
async function deleteSchema(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.schemas.delete("myResourceGroup", "my-schema-registry", "my-schema");
}

async function main(): Promise<void> {
  await deleteSchema();
}

main().catch(console.error);
