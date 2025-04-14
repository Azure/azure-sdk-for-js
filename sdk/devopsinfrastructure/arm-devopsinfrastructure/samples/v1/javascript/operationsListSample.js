// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevOpsInfrastructureClient } = require("@azure/arm-devopsinfrastructure");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2024-10-19/ListOperations.json
 */
async function operationsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new DevOpsInfrastructureClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  operationsList();
}

main().catch(console.error);
