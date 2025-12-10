// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list SchemaVersion resources by Schema
 *
 * @summary list SchemaVersion resources by Schema
 * x-ms-original-file: 2025-10-01/List_SchemaVersions_BySchema.json
 */
async function listSchemaVersionsSchema() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.schemaVersions.listBySchema(
    "myResourceGroup",
    "my-schema-registry",
    "my-schema",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listSchemaVersionsSchema();
}

main().catch(console.error);
