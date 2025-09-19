// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureQuotaExtensionAPI } = require("@azure/arm-quota");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a list of the subscriptionIds associated with the GroupQuotas.
 *
 * @summary returns a list of the subscriptionIds associated with the GroupQuotas.
 * x-ms-original-file: 2025-09-01/GroupQuotasSubscriptions/ListGroupQuotaSubscriptions.json
 */
async function groupQuotaSubscriptionsListSubscriptions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.groupQuotaSubscriptions.list(
    "E7EC67B3-7657-4966-BFFC-41EFD36BAA09",
    "groupquota1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await groupQuotaSubscriptionsListSubscriptions();
}

main().catch(console.error);
