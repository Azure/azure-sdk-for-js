// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeOperatorClient } from "@azure/arm-edgeoperator";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the Azure Local Disconnected Operations (ALDO) system readiness status.
 *
 * @summary gets the Azure Local Disconnected Operations (ALDO) system readiness status.
 * x-ms-original-file: 2026-06-01-preview/SystemReadinessOperations_Get.json
 */
async function systemReadinessOperationsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new EdgeOperatorClient(credential, subscriptionId);
  const result = await client.systemReadinessOperations.get();
  console.log(result);
}

async function main(): Promise<void> {
  await systemReadinessOperationsGet();
}

main().catch(console.error);
