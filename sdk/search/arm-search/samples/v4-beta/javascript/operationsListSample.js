// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SearchManagementClient } = require("@azure/arm-search");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the available REST API operations of the Microsoft.Search provider.
 *
 * @summary lists all of the available REST API operations of the Microsoft.Search provider.
 * x-ms-original-file: 2025-05-01/SearchListOperations.json
 */
async function searchListOperations() {
  const credential = new DefaultAzureCredential();
  const client = new SearchManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await searchListOperations();
}

main().catch(console.error);
