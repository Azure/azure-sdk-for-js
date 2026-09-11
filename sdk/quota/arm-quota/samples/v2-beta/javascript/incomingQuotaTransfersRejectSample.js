// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureQuotaExtensionAPI } = require("@azure/arm-quota");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reject a Pending incoming quota transfer. Synchronous. The `If-Match` header value
 * must equal `properties.sourceEtag` returned on a prior GET.
 *
 * @summary reject a Pending incoming quota transfer. Synchronous. The `If-Match` header value
 * must equal `properties.sourceEtag` returned on a prior GET.
 * x-ms-original-file: 2026-09-01-preview/IncomingQuotaTransfers/IncomingQuotaTransfers_Reject.json
 */
async function incomingQuotaTransfersReject() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-000000000002";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const result = await client.incomingQuotaTransfers.reject(
    "Microsoft.Compute",
    "eastus",
    "12345678-1234-1234-1234-1234567890ab",
    "abc123",
    { body: { reason: "Recipient capacity already satisfied." } },
  );
  console.log(result);
}

async function main() {
  await incomingQuotaTransfersReject();
}

main().catch(console.error);
