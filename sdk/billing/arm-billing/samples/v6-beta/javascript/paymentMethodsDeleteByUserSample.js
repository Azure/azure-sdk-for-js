// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a payment method owned by the caller.
 *
 * @summary deletes a payment method owned by the caller.
 * x-ms-original-file: 2024-04-01/paymentMethodsDeleteByUser.json
 */
async function deletePaymentMethodOwnedByUser() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  await client.paymentMethods.deleteByUser("ABCDABCDABC0");
}

async function main() {
  await deletePaymentMethodOwnedByUser();
}

main().catch(console.error);
