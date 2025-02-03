// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureTerraformClient } = require("@azure/arm-terraform");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2023-07-01-preview/ListOperations.json
 */
async function getAListOfOperationsForAResourceProvider() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureTerraformClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  getAListOfOperationsForAResourceProvider();
}

main().catch(console.error);
