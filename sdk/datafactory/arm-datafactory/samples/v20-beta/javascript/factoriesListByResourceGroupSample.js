// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists factories.
 *
 * @summary lists factories.
 * x-ms-original-file: 2018-06-01/Factories_ListByResourceGroup.json
 */
async function factoriesListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.factories.listByResourceGroup("exampleResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await factoriesListByResourceGroup();
}

main().catch(console.error);
