// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a SchemaRegistry
 *
 * @summary update a SchemaRegistry
 * x-ms-original-file: 2025-10-01/Update_SchemaRegistry.json
 */
async function updateSchemaRegistry(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.schemaRegistries.update("myResourceGroup", "my-schema-registry", {
    properties: {
      displayName: "Schema Registry namespace 001",
      description: "This is a sample Schema Registry",
    },
    tags: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateSchemaRegistry();
}

main().catch(console.error);
