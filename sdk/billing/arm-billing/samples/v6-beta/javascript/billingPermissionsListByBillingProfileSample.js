// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the billing permissions the caller has on a billing profile.
 *
 * @summary lists the billing permissions the caller has on a billing profile.
 * x-ms-original-file: 2024-04-01/billingPermissionsListByBillingProfile.json
 */
async function billingPermissionsListByBillingProfile() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingPermissions.listByBillingProfile(
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "xxxx-xxxx-xxx-xxx",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await billingPermissionsListByBillingProfile();
}

main().catch(console.error);
