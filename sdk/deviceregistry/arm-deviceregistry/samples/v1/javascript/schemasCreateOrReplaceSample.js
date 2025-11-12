// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Schema
 *
 * @summary create a Schema
 * x-ms-original-file: 2025-10-01/CreateOrReplace_Schema.json
 */
async function createOrReplaceSchema() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.schemas.createOrReplace(
    "myResourceGroup",
    "my-schema-registry",
    "my-schema",
    {
      properties: {
        displayName: "My Schema",
        description: "This is a sample Schema",
        format: "JsonSchema/draft-07",
        schemaType: "MessageSchema",
        tags: { sampleKey: "sampleValue" },
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrReplaceSchema();
}

main().catch(console.error);
