// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists Global parameters
 *
 * @summary lists Global parameters
 * x-ms-original-file: 2018-06-01/GlobalParameters_ListByFactory.json
 */
async function globalParametersListByFactory() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.globalParameters.listByFactory(
    "exampleResourceGroup",
    "exampleFactoryName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await globalParametersListByFactory();
}

main().catch(console.error);
