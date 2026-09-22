// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the agreements for a billing account.
 *
 * @summary lists the agreements for a billing account.
 * x-ms-original-file: 2024-04-01/agreementsListByBillingAccount.json
 */
async function agreementsListByBillingAccount() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.agreements.listByBillingAccount(
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    { expand: "Participants" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await agreementsListByBillingAccount();
}

main().catch(console.error);
