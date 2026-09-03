// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureQuotaExtensionAPI } = require("@azure/arm-quota");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the GroupQuotas with the subscription to add to the subscriptions list. The subscriptions will be validated if additionalAttributes are defined in the GroupQuota. The request's TenantId is validated against the subscription's TenantId.
 *
 * @summary updates the GroupQuotas with the subscription to add to the subscriptions list. The subscriptions will be validated if additionalAttributes are defined in the GroupQuota. The request's TenantId is validated against the subscription's TenantId.
 * x-ms-original-file: 2025-09-01/GroupQuotasSubscriptions/PatchGroupQuotasSubscription.json
 */
async function groupQuotaSubscriptionsPatchSubscriptions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const result = await client.groupQuotaSubscriptions.update(
    "E7EC67B3-7657-4966-BFFC-41EFD36BAA09",
    "groupquota1",
  );
  console.log(result);
}

async function main() {
  await groupQuotaSubscriptionsPatchSubscriptions();
}

main().catch(console.error);
