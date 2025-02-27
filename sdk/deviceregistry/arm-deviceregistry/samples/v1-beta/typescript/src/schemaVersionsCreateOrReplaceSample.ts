// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a SchemaVersion
 *
 * @summary create a SchemaVersion
 * x-ms-original-file: 2024-09-01-preview/Create_SchemaVersion.json
 */
async function createSchemaVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.schemaVersions.createOrReplace(
    "myResourceGroup",
    "my-schema-registry",
    "my-schema",
    "1",
    {
      properties: {
        description: "Schema version 1",
        schemaContent:
          '{"$schema": "http://json-schema.org/draft-07/schema#","type": "object","properties": {"humidity": {"type": "string"},"temperature": {"type":"number"}}}',
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  createSchemaVersion();
}

main().catch(console.error);
