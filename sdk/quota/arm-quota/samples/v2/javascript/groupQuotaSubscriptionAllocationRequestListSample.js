// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureQuotaExtensionAPI } = require("@azure/arm-quota");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all the quotaAllocationRequests for a resourceProvider/location. The filter paramter for location is required.
 *
 * @summary get all the quotaAllocationRequests for a resourceProvider/location. The filter paramter for location is required.
 * x-ms-original-file: 2025-09-01/SubscriptionQuotaAllocationRequests/SubscriptionQuotaAllocationRequests_List-Compute.json
 */
async function subscriptionQuotaAllocationListRequestForCompute() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.groupQuotaSubscriptionAllocationRequest.list(
    "E7EC67B3-7657-4966-BFFC-41EFD36BAA09",
    "groupquota1",
    "Microsoft.Compute",
    "location eq westus",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await subscriptionQuotaAllocationListRequestForCompute();
}

main().catch(console.error);
