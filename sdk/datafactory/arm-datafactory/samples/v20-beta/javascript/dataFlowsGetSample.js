// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a data flow.
 *
 * @summary gets a data flow.
 * x-ms-original-file: 2018-06-01/DataFlows_Get.json
 */
async function dataFlowsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.dataFlows.get(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleDataFlow",
  );
  console.log(result);
}

async function main() {
  await dataFlowsGet();
}

main().catch(console.error);
