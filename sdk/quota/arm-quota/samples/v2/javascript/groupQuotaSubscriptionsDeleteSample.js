// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureQuotaExtensionAPI } = require("@azure/arm-quota");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to removes the subscription from GroupQuotas. The request's TenantId is validated against the subscription's TenantId.
 *
 * @summary removes the subscription from GroupQuotas. The request's TenantId is validated against the subscription's TenantId.
 * x-ms-original-file: 2025-09-01/GroupQuotasSubscriptions/DeleteGroupQuotaSubscriptions.json
 */
async function groupQuotaSubscriptionsDeleteSubscriptions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  await client.groupQuotaSubscriptions.delete(
    "E7EC67B3-7657-4966-BFFC-41EFD36BAA09",
    "groupquota1",
  );
}

async function main() {
  await groupQuotaSubscriptionsDeleteSubscriptions();
}

main().catch(console.error);
