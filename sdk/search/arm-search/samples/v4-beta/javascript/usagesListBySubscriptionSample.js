// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SearchManagementClient } = require("@azure/arm-search");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of all Azure AI Search quota usages across the subscription.
 *
 * @summary get a list of all Azure AI Search quota usages across the subscription.
 * x-ms-original-file: 2026-03-01-preview/GetQuotaUsagesList.json
 */
async function getQuotaUsagesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usages.listBySubscription("westus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getQuotaUsagesList();
}

main().catch(console.error);
