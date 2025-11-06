// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsClient } from "@azure/arm-iotoperations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a DataflowGraphResource
 *
 * @summary delete a DataflowGraphResource
 * x-ms-original-file: 2025-10-01/DataflowGraph_Delete_MaximumSet_Gen.json
 */
async function dataflowGraphDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  await client.dataflowGraph.delete(
    "rgiotoperations",
    "resource-123",
    "resource-123",
    "resource-123",
  );
}

async function main(): Promise<void> {
  await dataflowGraphDeleteMaximumSet();
}

main().catch(console.error);
