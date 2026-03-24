// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an existing quota counter value in the specified service instance.
 *
 * @summary updates an existing quota counter value in the specified service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateQuotaCounterKeyByQuotaPeriod.json
 */
async function apiManagementUpdateQuotaCounterKeyByQuotaPeriod() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.quotaByPeriodKeys.update(
    "rg1",
    "apimService1",
    "ba",
    "0_P3Y6M4DT12H30M5S",
    { callsCount: 0, kbTransferred: 0 },
  );
  console.log(result);
}

async function main() {
  await apiManagementUpdateQuotaCounterKeyByQuotaPeriod();
}

main().catch(console.error);
