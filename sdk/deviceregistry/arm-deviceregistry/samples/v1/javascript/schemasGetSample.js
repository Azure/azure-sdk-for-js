// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Schema
 *
 * @summary get a Schema
 * x-ms-original-file: 2025-10-01/Get_Schema.json
 */
async function schemasGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.schemas.get("myResourceGroup", "my-schema-registry", "my-schema");
  console.log(result);
}

async function main() {
  await schemasGet();
}

main().catch(console.error);
