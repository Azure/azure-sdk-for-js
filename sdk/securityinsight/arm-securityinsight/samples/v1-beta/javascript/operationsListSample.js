// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all operations available Azure Security Insights Resource Provider.
 *
 * @summary lists all operations available Azure Security Insights Resource Provider.
 * x-ms-original-file: 2025-07-01-preview/operations/ListOperations.json
 */
async function getAllOperations() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityInsights(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllOperations();
}

main().catch(console.error);
