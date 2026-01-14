// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a SchemaRegistry
 *
 * @summary get a SchemaRegistry
 * x-ms-original-file: 2025-10-01/Get_SchemaRegistry.json
 */
async function getSchemaRegistry(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.schemaRegistries.get("myResourceGroup", "my-schema-registry");
  console.log(result);
}

async function main(): Promise<void> {
  await getSchemaRegistry();
}

main().catch(console.error);
