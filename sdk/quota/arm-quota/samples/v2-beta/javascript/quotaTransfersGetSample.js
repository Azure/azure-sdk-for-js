// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureQuotaExtensionAPI } = require("@azure/arm-quota");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a quota transfer.
 *
 * @summary get a quota transfer.
 * x-ms-original-file: 2026-09-01-preview/QuotaTransfers/QuotaTransfers_Get.json
 */
async function quotaTransfersGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-000000000001";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const result = await client.quotaTransfers.get(
    "Microsoft.Compute",
    "eastus",
    "compute-stdDv5-uplift-101",
  );
  console.log(result);
}

async function main() {
  await quotaTransfersGet();
}

main().catch(console.error);
