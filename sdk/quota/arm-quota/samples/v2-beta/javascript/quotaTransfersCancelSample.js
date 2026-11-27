// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureQuotaExtensionAPI } = require("@azure/arm-quota");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancel a Pending quota transfer. Synchronous. Transitions the transfer to Cancelled
 * and returns the refreshed resource envelope.
 *
 * @summary cancel a Pending quota transfer. Synchronous. Transitions the transfer to Cancelled
 * and returns the refreshed resource envelope.
 * x-ms-original-file: 2026-09-01-preview/QuotaTransfers/QuotaTransfers_Cancel.json
 */
async function quotaTransfersCancel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-000000000001";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const result = await client.quotaTransfers.cancel(
    "Microsoft.Compute",
    "eastus",
    "compute-stdDv5-uplift-101",
    { body: { reason: "Donor changed plans before recipient acted." } },
  );
  console.log(result);
}

async function main() {
  await quotaTransfersCancel();
}

main().catch(console.error);
