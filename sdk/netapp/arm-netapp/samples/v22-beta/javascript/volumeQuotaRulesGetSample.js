// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get details of the specified quota rule
 *
 * @summary get details of the specified quota rule
 * x-ms-original-file: 2025-09-01-preview/VolumeQuotaRules_Get.json
 */
async function volumeQuotaRulesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5275316f-a498-48d6-b324-2cbfdc4311b9";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.volumeQuotaRules.get(
    "myRG",
    "account-9957",
    "pool-5210",
    "volume-6387",
    "rule-0004",
  );
  console.log(result);
}

async function main() {
  await volumeQuotaRulesGet();
}

main().catch(console.error);
