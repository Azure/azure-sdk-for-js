// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the available REST API operations of the Microsoft.ApiManagement provider.
 *
 * @summary lists all of the available REST API operations of the Microsoft.ApiManagement provider.
 * x-ms-original-file: 2026-09-01-preview/AIGatewayListOperations.json
 */
async function listAIGatewayOperations() {
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAIGatewayOperations();
}

main().catch(console.error);
