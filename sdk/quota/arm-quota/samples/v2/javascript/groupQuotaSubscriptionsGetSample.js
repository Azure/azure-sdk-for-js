// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureQuotaExtensionAPI } = require("@azure/arm-quota");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the subscriptionIds along with its provisioning state for being associated with the GroupQuota. If the subscription is not a member of GroupQuota, it will return 404, else 200.
 *
 * @summary returns the subscriptionIds along with its provisioning state for being associated with the GroupQuota. If the subscription is not a member of GroupQuota, it will return 404, else 200.
 * x-ms-original-file: 2025-09-01/GroupQuotasSubscriptions/GetGroupQuotaSubscriptions.json
 */
async function groupQuotaSubscriptionsGetSubscriptions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const result = await client.groupQuotaSubscriptions.get(
    "E7EC67B3-7657-4966-BFFC-41EFD36BAA09",
    "groupquota1",
  );
  console.log(result);
}

async function main() {
  await groupQuotaSubscriptionsGetSubscriptions();
}

main().catch(console.error);
