// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a SchemaRegistry
 *
 * @summary create a SchemaRegistry
 * x-ms-original-file: 2025-10-01/CreateOrReplace_SchemaRegistry.json
 */
async function createOrReplaceSchemaRegistry() {
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
    },
  );
  console.log(result);
}

async function main() {
  await createOrReplaceSchemaRegistry();
}

main().catch(console.error);
