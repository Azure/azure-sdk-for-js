// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureQuotaExtensionAPI } = require("@azure/arm-quota");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list incoming quota transfers at the (subscription, targetProvider, region) scope.
 *
 * @summary list incoming quota transfers at the (subscription, targetProvider, region) scope.
 * x-ms-original-file: 2026-09-01-preview/IncomingQuotaTransfers/IncomingQuotaTransfers_List.json
 */
async function incomingQuotaTransfersList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-000000000002";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.incomingQuotaTransfers.list("Microsoft.Compute", "eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await incomingQuotaTransfersList();
}

main().catch(console.error);
