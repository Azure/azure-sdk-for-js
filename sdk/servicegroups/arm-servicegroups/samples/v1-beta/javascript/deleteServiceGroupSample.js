// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagementClient } = require("@azure/arm-servicegroups");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a ServiceGroup
 *
 * @summary delete a ServiceGroup
 * x-ms-original-file: 2024-02-01-preview/ServiceGroup_Delete.json
 */
async function deleteServiceGroup() {
  const credential = new DefaultAzureCredential();
  const client = new ManagementClient(credential);
  await client.deleteServiceGroup("20000000-0001-0000-0000-000000000000");
}

async function main() {
  await deleteServiceGroup();
}

main().catch(console.error);
