// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMapsManagementClient } = require("@azure/arm-maps");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list operations available for the Maps Resource Provider
 *
 * @summary list operations available for the Maps Resource Provider
 * x-ms-original-file: 2025-10-01-preview/GetOperations.json
 */
async function getOperations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.maps.listOperations()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getOperations();
}

main().catch(console.error);
