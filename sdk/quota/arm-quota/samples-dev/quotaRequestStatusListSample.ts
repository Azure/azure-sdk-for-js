// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to For the specified scope, get the current quota requests for a one year period ending at the time is made. Use the **oData** filter to select quota requests.
 *
 * @summary For the specified scope, get the current quota requests for a one year period ending at the time is made. Use the **oData** filter to select quota requests.
 * x-ms-original-file: specification/quota/resource-manager/Microsoft.Quota/stable/2025-03-01/examples/getQuotaRequestsHistory.json
 */

import { AzureQuotaExtensionAPI } from "@azure/arm-quota";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function quotaRequestHistory(): Promise<void> {
  const scope =
    "subscriptions/D7EC67B3-7657-4966-BFFC-41EFD36BAAB3/providers/Microsoft.Compute/locations/eastus";
  const credential = new DefaultAzureCredential();
  const client = new AzureQuotaExtensionAPI(credential);
  const resArray = new Array();
  for await (let item of client.quotaRequestStatus.list(scope)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await quotaRequestHistory();
}

main().catch(console.error);
