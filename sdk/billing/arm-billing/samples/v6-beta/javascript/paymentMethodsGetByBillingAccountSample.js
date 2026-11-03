// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a payment method available for a billing account. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 *
 * @summary gets a payment method available for a billing account. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 * x-ms-original-file: 2024-04-01/paymentMethodsGetByBillingAccount.json
 */
async function paymentMethodGetAtBillingProfile() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.paymentMethods.getByBillingAccount(
    "00000000-0000-0000-0000-000000000032:00000000-0000-0000-0000-000000000099_2019-05-31",
    "21dd9edc-af71-4d62-80ce-37151d475326",
  );
  console.log(result);
}

async function main() {
  await paymentMethodGetAtBillingProfile();
}

main().catch(console.error);
