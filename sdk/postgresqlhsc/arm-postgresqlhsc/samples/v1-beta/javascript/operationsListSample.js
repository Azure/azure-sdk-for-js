// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DBforPostgreSQLClient } = require("@azure/arm-postgresqlhsc");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2023-03-02-preview/OperationList.json
 */
async function listAllAvailableOperations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllAvailableOperations();
}

main().catch(console.error);
