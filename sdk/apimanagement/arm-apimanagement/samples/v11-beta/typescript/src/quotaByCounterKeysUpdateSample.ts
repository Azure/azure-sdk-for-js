// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates all the quota counter values specified with the existing quota counter key to a value in the specified service instance. This should be used for reset of the quota counter values.
 *
 * @summary updates all the quota counter values specified with the existing quota counter key to a value in the specified service instance. This should be used for reset of the quota counter values.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateQuotaCounterKey.json
 */
async function apiManagementUpdateQuotaCounterKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.quotaByCounterKeys.update("rg1", "apimService1", "ba", {
    callsCount: 0,
    kbTransferred: 2.5630078125,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateQuotaCounterKey();
}

main().catch(console.error);
