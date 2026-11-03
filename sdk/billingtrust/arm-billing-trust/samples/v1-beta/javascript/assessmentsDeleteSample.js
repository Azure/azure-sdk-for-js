// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingTrustClient } = require("@azure/arm-billing-trust");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an assessment. Long-running operation — returns 202 + 204 + default with `Azure-AsyncOperation` (preferred) and `Location` polling headers.
 *
 * @summary delete an assessment. Long-running operation — returns 202 + 204 + default with `Azure-AsyncOperation` (preferred) and `Location` polling headers.
 * x-ms-original-file: 2026-03-17-preview/Assessments_Delete.json
 */
async function deleteTheEduAssessmentForAnEnrollment() {
  const credential = new DefaultAzureCredential();
  const client = new BillingTrustClient(credential);
  await client.assessments.delete(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/billing-edu-rg/providers/Microsoft.Program/educationEnrollments/default",
  );
}

async function main() {
  await deleteTheEduAssessmentForAnEnrollment();
}

main().catch(console.error);
