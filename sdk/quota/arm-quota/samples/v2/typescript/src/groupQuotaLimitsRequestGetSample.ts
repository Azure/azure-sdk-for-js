// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureQuotaExtensionAPI } from "@azure/arm-quota";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get API to check the status of a GroupQuota request by requestId.
 *
 * @summary get API to check the status of a GroupQuota request by requestId.
 * x-ms-original-file: 2025-09-01/GroupQuotaLimitsRequests/GroupQuotaLimitsRequests_Get.json
 */
async function groupQuotaLimitsRequestsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const result = await client.groupQuotaLimitsRequest.get(
    "E7EC67B3-7657-4966-BFFC-41EFD36BAA09",
    "groupquota1",
    "requestId",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await groupQuotaLimitsRequestsGet();
}

main().catch(console.error);
