// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureQuotaExtensionAPI } = require("@azure/arm-quota");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list quota transfers at the (subscription, targetProvider, region) scope.
 *
 * @summary list quota transfers at the (subscription, targetProvider, region) scope.
 * x-ms-original-file: 2026-09-01-preview/QuotaTransfers/QuotaTransfers_List.json
 */
async function quotaTransfersList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-000000000001";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.quotaTransfers.list("Microsoft.Compute", "eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await quotaTransfersList();
}

main().catch(console.error);
