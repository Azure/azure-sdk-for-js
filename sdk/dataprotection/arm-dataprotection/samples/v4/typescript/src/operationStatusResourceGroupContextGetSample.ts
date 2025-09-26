// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the operation status for an operation over a ResourceGroup's context.
 *
 * @summary gets the operation status for an operation over a ResourceGroup's context.
 * x-ms-original-file: 2025-07-01/GetOperationStatusRGContext.json
 */
async function getOperationStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.operationStatusResourceGroupContext.get(
    "SampleResourceGroup",
    "MjkxOTMyODMtYTE3My00YzJjLTg5NjctN2E4MDIxNDA3NjA2OzdjNGE2ZWRjLWJjMmItNDRkYi1hYzMzLWY1YzEwNzk5Y2EyOA==",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getOperationStatus();
}

main().catch(console.error);
