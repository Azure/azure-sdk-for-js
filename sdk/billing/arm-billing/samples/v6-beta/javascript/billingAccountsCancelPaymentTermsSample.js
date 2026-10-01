// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancels all the payment terms on billing account that falls after the cancellation date in the request. Currently, cancel payment terms is only served by admin actions and is not a self-serve action.
 *
 * @summary cancels all the payment terms on billing account that falls after the cancellation date in the request. Currently, cancel payment terms is only served by admin actions and is not a self-serve action.
 * x-ms-original-file: 2024-04-01/paymentTermsCancel.json
 */
async function paymentTermsCancel() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingAccounts.cancelPaymentTerms(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    new Date("2023-01-05T22:39:34.2606750Z"),
  );
  console.log(result);
}

async function main() {
  await paymentTermsCancel();
}

main().catch(console.error);
