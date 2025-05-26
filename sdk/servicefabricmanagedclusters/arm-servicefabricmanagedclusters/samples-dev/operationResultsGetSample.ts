// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get long running operation result.
 *
 * @summary get long running operation result.
 * x-ms-original-file: 2025-03-01-preview/OperationResultsGet_example.json
 */
async function getLongRunningOperationResult(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  await client.operationResults.get("eastus", "00000000-0000-0000-0000-000000001234");
}

async function main(): Promise<void> {
  await getLongRunningOperationResult();
}

main().catch(console.error);
