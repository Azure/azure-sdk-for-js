// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureQuotaExtensionAPI } from "@azure/arm-quota";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a quota transfer record. Quota is not moved by delete; only the resource entry
 * is removed.
 *
 * @summary delete a quota transfer record. Quota is not moved by delete; only the resource entry
 * is removed.
 * x-ms-original-file: 2026-09-01-preview/QuotaTransfers/QuotaTransfers_Delete.json
 */
async function quotaTransfersDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-000000000001";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  await client.quotaTransfers.delete("Microsoft.Compute", "eastus", "compute-stdDv5-uplift-101");
}

async function main(): Promise<void> {
  await quotaTransfersDelete();
}

main().catch(console.error);
