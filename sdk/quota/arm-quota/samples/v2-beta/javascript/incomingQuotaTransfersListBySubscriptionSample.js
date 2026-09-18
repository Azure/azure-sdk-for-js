// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureQuotaExtensionAPI } = require("@azure/arm-quota");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list incoming quota transfers across every targetProvider and region for the
 * subscription.
 *
 * @summary list incoming quota transfers across every targetProvider and region for the
 * subscription.
 * x-ms-original-file: 2026-09-01-preview/IncomingQuotaTransfers/IncomingQuotaTransfers_ListBySubscription.json
 */
async function incomingQuotaTransfersListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-000000000002";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.incomingQuotaTransfers.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await incomingQuotaTransfersListBySubscription();
}

main().catch(console.error);
