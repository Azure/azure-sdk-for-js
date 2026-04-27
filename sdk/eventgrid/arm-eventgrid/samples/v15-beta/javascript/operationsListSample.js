// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the available operations supported by the Microsoft.EventGrid resource provider.
 *
 * @summary list the available operations supported by the Microsoft.EventGrid resource provider.
 * x-ms-original-file: 2025-07-15-preview/Operations_List.json
 */
async function operationsList() {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await operationsList();
}

main().catch(console.error);
