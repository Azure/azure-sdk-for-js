// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2025-04-01/listOperations.json
 */

import { CarbonOptimizationManagementClient } from "@azure/arm-carbonoptimization";
import { DefaultAzureCredential } from "@azure/identity";

async function operationsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await operationsList();
}

main().catch(console.error);
