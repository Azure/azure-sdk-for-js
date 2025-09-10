// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the Batch service quotas for the specified subscription at the given location.
 *
 * @summary Gets the Batch service quotas for the specified subscription at the given location.
 * x-ms-original-file: specification/batch/resource-manager/Microsoft.Batch/stable/2024-07-01/examples/LocationGetQuotas.json
 */

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function locationGetQuotas(): Promise<void> {
  const subscriptionId = process.env["BATCH_SUBSCRIPTION_ID"] || "subid";
  const locationName = "japaneast";
  const credential = new DefaultAzureCredential();
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.location.getQuotas(locationName);
  console.log(result);
}

async function main(): Promise<void> {
  await locationGetQuotas();
}

main().catch(console.error);
