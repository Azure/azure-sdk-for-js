// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureQuotaExtensionAPI } = require("@azure/arm-quota");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to for the specified scope, get the current quota requests for a one year period ending at the time is made. Use the **oData** filter to select quota requests.
 *
 * @summary for the specified scope, get the current quota requests for a one year period ending at the time is made. Use the **oData** filter to select quota requests.
 * x-ms-original-file: 2025-09-01/getQuotaRequestsHistory.json
 */
async function quotaRequestHistory() {
  const credential = new DefaultAzureCredential();
  const client = new AzureQuotaExtensionAPI(credential);
  const resArray = new Array();
  for await (const item of client.quotaRequestStatus.list(
    "subscriptions/D7EC67B3-7657-4966-BFFC-41EFD36BAAB3/providers/Microsoft.Compute/locations/eastus",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await quotaRequestHistory();
}

main().catch(console.error);
