// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists a collection of current quota counter periods associated with the counter-key configured in the policy on the specified service instance. The api does not support paging yet.
 *
 * @summary lists a collection of current quota counter periods associated with the counter-key configured in the policy on the specified service instance. The api does not support paging yet.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetQuotaCounterKeys.json
 */
async function apiManagementGetQuotaCounterKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.quotaByCounterKeys.listByService("rg1", "apimService1", "ba");
  console.log(result);
}

async function main() {
  await apiManagementGetQuotaCounterKeys();
}

main().catch(console.error);
