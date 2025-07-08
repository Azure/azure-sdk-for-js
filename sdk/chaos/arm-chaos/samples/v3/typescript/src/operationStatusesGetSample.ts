// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the current status of an async operation.
 *
 * @summary returns the current status of an async operation.
 * x-ms-original-file: 2025-01-01/OperationStatuses_Get.json
 */
async function getsChaosStudioAsyncOperationStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e25c0d12-0335-4fec-8ef8-3b4f9a10649e";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.operationStatuses.get(
    "westus2",
    "4bdadd97-207c-4de8-9bba-08339ae099c7",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsChaosStudioAsyncOperationStatus();
}

main().catch(console.error);
