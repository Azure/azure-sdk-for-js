// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureQuotaExtensionAPI } = require("@azure/arm-quota");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get an incoming quota transfer.
 *
 * @summary get an incoming quota transfer.
 * x-ms-original-file: 2026-09-01-preview/IncomingQuotaTransfers/IncomingQuotaTransfers_Get.json
 */
async function incomingQuotaTransfersGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-000000000002";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const result = await client.incomingQuotaTransfers.get(
    "Microsoft.Compute",
    "eastus",
    "12345678-1234-1234-1234-1234567890ab",
  );
  console.log(result);
}

async function main() {
  await incomingQuotaTransfersGet();
}

main().catch(console.error);
