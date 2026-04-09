// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTOperationsClient } = require("@azure/arm-iotoperations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a AkriServiceResource
 *
 * @summary delete a AkriServiceResource
 * x-ms-original-file: 2026-03-01/AkriService_Delete_MaximumSet_Gen.json
 */
async function akriServiceDeleteMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  await client.akriService.delete("rgiotoperations", "resource-name123", "resource-name123");
}

async function main() {
  await akriServiceDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
