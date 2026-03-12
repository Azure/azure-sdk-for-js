// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureQuotaExtensionAPI } = require("@azure/arm-quota");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the GroupQuotas for the name passed. All the remaining shareQuota in the GroupQuotas will be lost.
 *
 * @summary deletes the GroupQuotas for the name passed. All the remaining shareQuota in the GroupQuotas will be lost.
 * x-ms-original-file: 2025-09-01/GroupQuotas/DeleteGroupQuotas.json
 */
async function groupQuotasDeleteRequestForCompute() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  await client.groupQuotas.delete("E7EC67B3-7657-4966-BFFC-41EFD36BAA09", "groupquota1");
}

async function main() {
  await groupQuotasDeleteRequestForCompute();
}

main().catch(console.error);
