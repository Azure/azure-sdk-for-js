// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an invoice section. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 *
 * @summary creates or updates an invoice section. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 * x-ms-original-file: 2024-04-01/invoiceSectionsCreateOrUpdate.json
 */
async function invoiceSectionsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.invoiceSections.createOrUpdate(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "xxxx-xxxx-xxx-xxx",
    "invoice-section-1",
    {
      properties: {
        displayName: "Invoice Section 1",
        tags: { costCategory: "Support", pcCode: "A123456" },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await invoiceSectionsCreateOrUpdate();
}

main().catch(console.error);
