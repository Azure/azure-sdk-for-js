// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthbotClient } = require("@azure/arm-healthbot");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the available Azure Health Bot operations.
 *
 * @summary lists all the available Azure Health Bot operations.
 * x-ms-original-file: 2025-11-01/GetOperations.json
 */
async function getOperations() {
  const credential = new DefaultAzureCredential();
  const client = new HealthbotClient(credential);
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
