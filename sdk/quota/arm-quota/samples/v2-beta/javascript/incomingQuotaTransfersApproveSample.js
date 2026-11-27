// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureQuotaExtensionAPI } = require("@azure/arm-quota");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to approve a Pending incoming quota transfer. Long-running. The `If-Match` header value
 * must equal `properties.sourceEtag` returned on a prior GET; a stale value yields
 * 412 SourceResourceModified.
 *
 * @summary approve a Pending incoming quota transfer. Long-running. The `If-Match` header value
 * must equal `properties.sourceEtag` returned on a prior GET; a stale value yields
 * 412 SourceResourceModified.
 * x-ms-original-file: 2026-09-01-preview/IncomingQuotaTransfers/IncomingQuotaTransfers_Approve.json
 */
async function incomingQuotaTransfersApprove() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-000000000002";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const result = await client.incomingQuotaTransfers.approve(
    "Microsoft.Compute",
    "eastus",
    "12345678-1234-1234-1234-1234567890ab",
    "abc123",
    { body: { comment: "Approved by capacity team." } },
  );
  console.log(result);
}

async function main() {
  await incomingQuotaTransfersApprove();
}

main().catch(console.error);
