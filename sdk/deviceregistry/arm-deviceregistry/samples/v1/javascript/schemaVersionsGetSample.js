// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a SchemaVersion
 *
 * @summary get a SchemaVersion
 * x-ms-original-file: 2025-10-01/Get_SchemaVersion.json
 */
async function getSchemaVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.schemaVersions.get(
    "myResourceGroup",
    "my-schema-registry",
    "my-schema",
    "1",
  );
  console.log(result);
}

async function main() {
  await getSchemaVersion();
}

main().catch(console.error);
