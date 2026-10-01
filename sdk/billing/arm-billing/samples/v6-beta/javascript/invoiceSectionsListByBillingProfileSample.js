// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the invoice sections that a user has access to. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 *
 * @summary lists the invoice sections that a user has access to. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 * x-ms-original-file: 2024-04-01/invoiceSectionsListByBillingProfile.json
 */
async function invoiceSectionsListByBillingProfile() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.invoiceSections.listByBillingProfile(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "xxxx-xxxx-xxx-xxx",
    { includeDeleted: true },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await invoiceSectionsListByBillingProfile();
}

main().catch(console.error);
