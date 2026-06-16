// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns operation results for long running operations.
 *
 * @summary returns operation results for long running operations.
 * x-ms-original-file: 2025-10-01-preview/OperationResults/GetOperationResult.json
 */
async function getOperationResult(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.operationResults.get("eastus", "00000000-0000-0000-0000-000000000000");
}

async function main(): Promise<void> {
  await getOperationResult();
}

main().catch(console.error);
