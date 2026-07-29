// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingTrustClient } from "@azure/arm-billing-trust";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Rule
 *
 * @summary get a Rule
 * x-ms-original-file: 2026-03-17-preview/Rules_Get.json
 */
async function getAnEduQualificationRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingTrustClient(credential);
  const result = await client.rules.get(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/billing-edu-rg/providers/Microsoft.Program/educationEnrollments/default",
    "Qualify_Edu",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAnEduQualificationRule();
}

main().catch(console.error);
