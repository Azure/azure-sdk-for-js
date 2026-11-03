// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a payment method owned by the caller.
 *
 * @summary gets a payment method owned by the caller.
 * x-ms-original-file: 2024-04-01/paymentMethodsGetByUser.json
 */
async function getPaymentMethodOwnedByUser() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.paymentMethods.getByUser("ABCDABCDABC0");
  console.log(result);
}

async function main() {
  await getPaymentMethodOwnedByUser();
}

main().catch(console.error);
