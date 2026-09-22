// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the Batch service quotas for the specified subscription at the given location.
 *
 * @summary gets the Batch service quotas for the specified subscription at the given location.
 * x-ms-original-file: 2025-06-01/LocationGetQuotas.json
 */
async function locationGetQuotas(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.location.getQuotas("japaneast");
  console.log(result);
}

async function main(): Promise<void> {
  await locationGetQuotas();
}

main().catch(console.error);
