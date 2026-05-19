// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a data flow.
 *
 * @summary gets a data flow.
 * x-ms-original-file: 2018-06-01/DataFlows_Get.json
 */
async function dataFlowsGet(): Promise<void> {
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

async function main(): Promise<void> {
  await dataFlowsGet();
}

main().catch(console.error);
