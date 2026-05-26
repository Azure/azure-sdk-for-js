// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to validates if the invoice section can be deleted. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement.
 *
 * @summary validates if the invoice section can be deleted. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement.
 * x-ms-original-file: 2024-04-01/invoiceSectionsValidateDeleteEligibilityFailure.json
 */
async function invoiceSectionsValidateDeleteEligibilityFailure(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.invoiceSections.validateDeleteEligibility(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "xxxx-xxxx-xxx-xxx",
    "yyyy-yyyy-yyy-yyy",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to validates if the invoice section can be deleted. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement.
 *
 * @summary validates if the invoice section can be deleted. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement.
 * x-ms-original-file: 2024-04-01/invoiceSectionsValidateDeleteEligibilitySuccess.json
 */
async function invoiceSectionsValidateDeleteEligibilitySuccess(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.invoiceSections.validateDeleteEligibility(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "xxxx-xxxx-xxx-xxx",
    "yyyy-yyyy-yyy-yyy",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await invoiceSectionsValidateDeleteEligibilityFailure();
  await invoiceSectionsValidateDeleteEligibilitySuccess();
}

main().catch(console.error);
