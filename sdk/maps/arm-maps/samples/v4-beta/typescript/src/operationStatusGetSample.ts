// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMapsManagementClient } from "@azure/arm-maps";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the status of a long running azure asynchronous operation.
 *
 * @summary get the status of a long running azure asynchronous operation.
 * x-ms-original-file: 2025-10-01-preview/GetOperationStatus.json
 */
async function operationStatusGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  const result = await client.operationStatus.get("eastus", "01234567-89ab-4def-0123-456789abcdef");
  console.log(result);
}

async function main(): Promise<void> {
  await operationStatusGet();
}

main().catch(console.error);
