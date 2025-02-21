// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Schema
 *
 * @summary delete a Schema
 * x-ms-original-file: 2024-09-01-preview/Delete_Schema.json
 */
async function deleteSchema() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.schemas.delete("myResourceGroup", "my-schema-registry", "my-schema");
}

async function main() {
  deleteSchema();
}

main().catch(console.error);
