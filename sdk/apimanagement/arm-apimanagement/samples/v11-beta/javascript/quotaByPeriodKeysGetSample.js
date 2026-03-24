// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the value of the quota counter associated with the counter-key in the policy for the specific period in service instance.
 *
 * @summary gets the value of the quota counter associated with the counter-key in the policy for the specific period in service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetQuotaCounterKeysByQuotaPeriod.json
 */
async function apiManagementGetQuotaCounterKeysByQuotaPeriod() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.quotaByPeriodKeys.get(
    "rg1",
    "apimService1",
    "ba",
    "0_P3Y6M4DT12H30M5S",
  );
  console.log(result);
}

async function main() {
  await apiManagementGetQuotaCounterKeysByQuotaPeriod();
}

main().catch(console.error);
