// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to query all active data flow debug sessions.
 *
 * @summary query all active data flow debug sessions.
 * x-ms-original-file: 2018-06-01/DataFlowDebugSession_QueryByFactory.json
 */
async function dataFlowDebugSessionQueryByFactory() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dataFlowDebugSession.queryByFactory(
    "exampleResourceGroup",
    "exampleFactoryName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await dataFlowDebugSessionQueryByFactory();
}

main().catch(console.error);
