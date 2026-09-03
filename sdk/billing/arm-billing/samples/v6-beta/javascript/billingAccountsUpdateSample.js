// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the properties of a billing account. Currently, displayName and address can be updated for billing accounts with agreement type Microsoft Customer Agreement. Currently address and notification email address can be updated for billing accounts with agreement type Microsoft Online Services Agreement. Currently, purchase order number can be edited for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary updates the properties of a billing account. Currently, displayName and address can be updated for billing accounts with agreement type Microsoft Customer Agreement. Currently address and notification email address can be updated for billing accounts with agreement type Microsoft Online Services Agreement. Currently, purchase order number can be edited for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: 2024-04-01/billingAccountUpdateWithPONumber.json
 */
async function billingAccountUpdateWithPONumber() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingAccounts.update("6575495", {
    properties: { enrollmentDetails: { poNumber: "poNumber123" } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates the properties of a billing account. Currently, displayName and address can be updated for billing accounts with agreement type Microsoft Customer Agreement. Currently address and notification email address can be updated for billing accounts with agreement type Microsoft Online Services Agreement. Currently, purchase order number can be edited for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary updates the properties of a billing account. Currently, displayName and address can be updated for billing accounts with agreement type Microsoft Customer Agreement. Currently address and notification email address can be updated for billing accounts with agreement type Microsoft Online Services Agreement. Currently, purchase order number can be edited for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: 2024-04-01/billingAccountsUpdate.json
 */
async function billingAccountsUpdate() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingAccounts.update(
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    {
      properties: {
        displayName: "Test Account",
        soldTo: {
          addressLine1: "1 Microsoft Way",
          city: "Redmond",
          companyName: "Contoso",
          country: "US",
          postalCode: "98052-8300",
          region: "WA",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await billingAccountUpdateWithPONumber();
  await billingAccountsUpdate();
}

main().catch(console.error);
