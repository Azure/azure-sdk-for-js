// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to moves charges for a subscription to a new invoice section. The new invoice section must belong to the same billing profile as the existing invoice section. This operation is supported for billing accounts with agreement type Microsoft Customer Agreement.
 *
 * @summary moves charges for a subscription to a new invoice section. The new invoice section must belong to the same billing profile as the existing invoice section. This operation is supported for billing accounts with agreement type Microsoft Customer Agreement.
 * x-ms-original-file: 2024-04-01/billingSubscriptionMove.json
 */
async function billingSubscriptionMove() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingSubscriptions.move(
    "a1a9c77e-4cec-4a6c-a089-867d973a6074:a80d3b1f-c626-4e5e-82ed-1173bd91c838_2019-05-31",
    "6b96d3f2-9008-4a9d-912f-f87744185aa3",
    {
      destinationInvoiceSectionId:
        "/providers/Microsoft.Billing/billingAccounts/a1a9c77e-4cec-4a6c-a089-867d973a6074:a80d3b1f-c626-4e5e-82ed-1173bd91c838_2019-05-31/billingProfiles/ea36e548-1505-41db-bebc-46fff3d37998/invoiceSections/Q7GV-UUVA-PJA-TGB",
    },
  );
  console.log(result);
}

async function main() {
  await billingSubscriptionMove();
}

main().catch(console.error);
