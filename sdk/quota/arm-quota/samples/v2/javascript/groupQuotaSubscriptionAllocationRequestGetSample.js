// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureQuotaExtensionAPI } = require("@azure/arm-quota");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the quota allocation request status for the subscriptionId by allocationId.
 *
 * @summary get the quota allocation request status for the subscriptionId by allocationId.
 * x-ms-original-file: 2025-09-01/SubscriptionQuotaAllocationRequests/SubscriptionQuotaAllocationRequests_Get-Compute.json
 */
async function subscriptionQuotaAllocationRequestsGetRequestForCompute() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const result = await client.groupQuotaSubscriptionAllocationRequest.get(
    "E7EC67B3-7657-4966-BFFC-41EFD36BAA09",
    "groupquota1",
    "Microsoft.Compute",
    "AE000000-0000-0000-0000-00000000000A",
  );
  console.log(result);
}

async function main() {
  await subscriptionQuotaAllocationRequestsGetRequestForCompute();
}

main().catch(console.error);
