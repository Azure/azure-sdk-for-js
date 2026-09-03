// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to provides a list of check access response objects for an enrollment account.
 *
 * @summary provides a list of check access response objects for an enrollment account.
 * x-ms-original-file: 2024-04-01/checkAccessByEnrollmentAccount.json
 */
async function checkAccessByEnrollmentAccount() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingPermissions.checkAccessByEnrollmentAccount(
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "123456",
    {
      actions: [
        "Microsoft.Billing/billingAccounts/read",
        "Microsoft.Subscription/subscriptions/write",
      ],
    },
  );
  console.log(result);
}

async function main() {
  await checkAccessByEnrollmentAccount();
}

main().catch(console.error);
