// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the current status of an async operation.
 *
 * @summary returns the current status of an async operation.
 * x-ms-original-file: 2026-04-01-preview/OperationStatus_Get_MaximumSet_Gen.json
 */
async function operationStatusGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.operationStatus.get("eastus", "12345678-1234-1234-1234-123456789012");
  console.log(result);
}

async function main() {
  await operationStatusGetMaximumSet();
}

main().catch(console.error);
