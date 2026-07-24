// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingTrustClient } = require("@azure/arm-billing-trust");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to request a time-bound, principal-bound upload token for supplemental document uploads.
 *
 * @summary request a time-bound, principal-bound upload token for supplemental document uploads.
 * x-ms-original-file: 2026-03-17-preview/Assessments_ListUploadToken.json
 */
async function listAnUploadTokenForSupplementalDocuments() {
  const credential = new DefaultAzureCredential();
  const client = new BillingTrustClient(credential);
  const result = await client.assessments.listUploadToken(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/billing-edu-rg/providers/Microsoft.Program/educationEnrollments/default",
  );
  console.log(result);
}

async function main() {
  await listAnUploadTokenForSupplementalDocuments();
}

main().catch(console.error);
