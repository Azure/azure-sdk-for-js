// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingTrustClient } from "@azure/arm-billing-trust";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Assessment resources by parent
 *
 * @summary list Assessment resources by parent
 * x-ms-original-file: 2026-03-17-preview/Assessments_List.json
 */
async function listAssessmentsForAnEnrollmentScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingTrustClient(credential);
  const resArray = new Array();
  for await (const item of client.assessments.list(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/billing-edu-rg/providers/Microsoft.Program/educationEnrollments/default",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAssessmentsForAnEnrollmentScope();
}

main().catch(console.error);
