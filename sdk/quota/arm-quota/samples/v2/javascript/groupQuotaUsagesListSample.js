// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureQuotaExtensionAPI } = require("@azure/arm-quota");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the GroupQuotas usages and limits(quota). Location is required paramter.
 *
 * @summary gets the GroupQuotas usages and limits(quota). Location is required paramter.
 * x-ms-original-file: 2025-09-01/GroupQuotaUsages/GetGroupQuotaUsages.json
 */
async function groupQuotasUsagesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.groupQuotaUsages.list(
    "E7EC67B3-7657-4966-BFFC-41EFD36BAA09",
    "groupquota1",
    "Microsoft.Compute",
    "westus",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await groupQuotasUsagesList();
}

main().catch(console.error);
