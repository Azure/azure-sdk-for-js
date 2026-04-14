// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to query all active data flow debug sessions.
 *
 * @summary query all active data flow debug sessions.
 * x-ms-original-file: 2018-06-01/DataFlowDebugSession_QueryByFactory.json
 */
async function dataFlowDebugSessionQueryByFactory(): Promise<void> {
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

async function main(): Promise<void> {
  await dataFlowDebugSessionQueryByFactory();
}

main().catch(console.error);
