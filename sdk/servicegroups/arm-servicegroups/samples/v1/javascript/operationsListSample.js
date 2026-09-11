// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceGroupsManagementClient } = require("@azure/arm-servicegroups");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all available REST API operations for the Microsoft.Management resource provider.
 *
 * @summary lists all available REST API operations for the Microsoft.Management resource provider.
 * x-ms-original-file: 2026-08-01/Operations_List.json
 */
async function listOperations() {
  const credential = new DefaultAzureCredential();
  const client = new ServiceGroupsManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listOperations();
}

main().catch(console.error);
