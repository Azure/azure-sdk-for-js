// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingTrustClient } from "@azure/arm-billing-trust";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Assessment
 *
 * @summary get a Assessment
 * x-ms-original-file: 2026-03-17-preview/Assessments_Get.json
 */
async function getTheEduAssessmentForAnEnrollment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingTrustClient(credential);
  const result = await client.assessments.get(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/billing-edu-rg/providers/Microsoft.Program/educationEnrollments/default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTheEduAssessmentForAnEnrollment();
}

main().catch(console.error);
