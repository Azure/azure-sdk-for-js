// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the default, current and usages account quota limit
 *
 * @summary get the default, current and usages account quota limit
 * x-ms-original-file: 2025-09-01-preview/NetAppResourceQuotaLimitsAccount_Get.json
 */
async function quotaLimits() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "D633CC2E-722B-4AE1-B636-BBD9E4C60ED9";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.netAppResourceQuotaLimitsAccount.get(
    "myRG",
    "myAccount",
    "poolsPerAccount",
  );
  console.log(result);
}

async function main() {
  await quotaLimits();
}

main().catch(console.error);
