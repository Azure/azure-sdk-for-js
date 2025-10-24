// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the default and current quota limit
 *
 * @summary get the default and current quota limit
 * x-ms-original-file: 2025-07-01-preview/QuotaLimits_Get.json
 */
async function quotaLimits() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.netAppResourceQuotaLimits.get(
    "eastus",
    "totalCoolAccessVolumesPerSubscription",
  );
  console.log(result);
}

async function main() {
  await quotaLimits();
}

main().catch(console.error);
