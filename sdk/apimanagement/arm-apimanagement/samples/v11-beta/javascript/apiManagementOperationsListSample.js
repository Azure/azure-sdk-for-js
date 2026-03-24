// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the available REST API operations of the Microsoft.ApiManagement provider.
 *
 * @summary lists all of the available REST API operations of the Microsoft.ApiManagement provider.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListOperations.json
 */
async function apiManagementListOperations() {
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.apiManagementOperations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementListOperations();
}

main().catch(console.error);
