// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the current status of an async operation.
 *
 * @summary returns the current status of an async operation.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetOperationStatus.json
 */
async function getOperationStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.operationStatus.get(
    "testLocation",
    "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getOperationStatus();
}

main().catch(console.error);
