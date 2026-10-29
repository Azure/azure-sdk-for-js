// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformClient } from "@azure/arm-anyscale";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the current status of an asynchronous operation.
 *
 * @summary returns the current status of an asynchronous operation.
 * x-ms-original-file: 2026-09-01/OperationStatuses_Get.json
 */
async function operationStatusesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  const result = await client.operationStatuses.get(
    "eastus",
    "9e4d5a19-61f0-4c75-8a34-2e16a915b062",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await operationStatusesGet();
}

main().catch(console.error);
