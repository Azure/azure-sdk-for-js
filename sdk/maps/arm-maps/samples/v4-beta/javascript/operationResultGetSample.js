// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMapsManagementClient } = require("@azure/arm-maps");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the result of a long running azure asynchronous operation.
 *
 * @summary get the result of a long running azure asynchronous operation.
 * x-ms-original-file: 2025-10-01-preview/GetOperationResult.json
 */
async function operationResultGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  await client.operationResult.get("eastus", "01234567-89ab-4def-0123-456789abcdef");
}

async function main() {
  await operationResultGet();
}

main().catch(console.error);
