// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a data flow.
 *
 * @summary deletes a data flow.
 * x-ms-original-file: 2018-06-01/DataFlows_Delete.json
 */
async function dataFlowsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.dataFlows.delete("exampleResourceGroup", "exampleFactoryName", "exampleDataFlow");
}

async function main(): Promise<void> {
  await dataFlowsDelete();
}

main().catch(console.error);
