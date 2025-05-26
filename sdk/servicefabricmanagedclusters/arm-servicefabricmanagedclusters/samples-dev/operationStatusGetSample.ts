// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get long running operation status.
 *
 * @summary get long running operation status.
 * x-ms-original-file: 2025-03-01-preview/OperationStatusFailed_example.json
 */
async function errorResponseDescribingWhyTheOperationFailed(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const result = await client.operationStatus.get("eastus", "00000000-0000-0000-0000-000000001234");
  console.log(result);
}

/**
 * This sample demonstrates how to get long running operation status.
 *
 * @summary get long running operation status.
 * x-ms-original-file: 2025-03-01-preview/OperationStatusSucceeded_example.json
 */
async function okTheRequestHasSucceeded(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const result = await client.operationStatus.get("eastus", "00000000-0000-0000-0000-000000001234");
  console.log(result);
}

async function main(): Promise<void> {
  await errorResponseDescribingWhyTheOperationFailed();
  await okTheRequestHasSucceeded();
}

main().catch(console.error);
