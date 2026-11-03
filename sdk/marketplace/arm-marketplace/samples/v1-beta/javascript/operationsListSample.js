// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MarketplaceClient } = require("@azure/arm-marketplace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the available Microsoft.Marketplace REST API operations.
 *
 * @summary lists all of the available Microsoft.Marketplace REST API operations.
 * x-ms-original-file: 2025-01-01/GetOperations.json
 */
async function getOperations() {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getOperations();
}

main().catch(console.error);
