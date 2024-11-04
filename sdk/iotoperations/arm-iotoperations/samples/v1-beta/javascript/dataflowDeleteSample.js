// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTOperationsClient } = require("@azure/arm-iotoperations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a DataflowResource
 *
 * @summary delete a DataflowResource
 * x-ms-original-file: 2024-09-15-preview/Dataflow_Delete_MaximumSet_Gen.json
 */
async function dataflowDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  await client.dataflow.delete(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    "resource-name123",
  );
}

async function main() {
  dataflowDelete();
}

main().catch(console.error);
