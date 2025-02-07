// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a SchemaRegistry
 *
 * @summary create a SchemaRegistry
 * x-ms-original-file: 2024-09-01-preview/Create_SchemaRegistry.json
 */
async function createSchemaRegistry(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.schemaRegistries.createOrReplace(
    "myResourceGroup",
    "my-schema-registry",
    {
      properties: {
        namespace: "sr-namespace-001",
        displayName: "Schema Registry namespace 001",
        description: "This is a sample Schema Registry",
        storageAccountContainerUrl: "my-blob-storage.blob.core.windows.net/my-container",
      },
      tags: {},
      location: "West Europe",
      identity: { type: "None" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createSchemaRegistry();
}

main().catch(console.error);
