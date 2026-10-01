// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureReservationAPI } = require("@azure/arm-reservations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the operations.
 *
 * @summary list all the operations.
 * x-ms-original-file: 2022-11-01/GetOperations.json
 */
async function getOperations() {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const resArray = new Array();
  for await (const item of client.operation.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getOperations();
}

main().catch(console.error);
