// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a data flow debug session.
 *
 * @summary deletes a data flow debug session.
 * x-ms-original-file: 2018-06-01/DataFlowDebugSession_Delete.json
 */
async function dataFlowDebugSessionDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.dataFlowDebugSession.delete("exampleResourceGroup", "exampleFactoryName", {
    sessionId: "91fb57e0-8292-47be-89ff-c8f2d2bb2a7e",
  });
}

async function main() {
  await dataFlowDebugSessionDelete();
}

main().catch(console.error);
