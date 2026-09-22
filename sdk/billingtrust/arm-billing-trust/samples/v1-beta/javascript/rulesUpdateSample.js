// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingTrustClient } = require("@azure/arm-billing-trust");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Rule. The PATCH body is discriminated by `kind` and must match the existing rule's kind. For `eduQualification` rules, only `supplementalDocuments` is patchable, and only when `evaluationState == actionRequired`. For `businessVerification` rules, the patchable fields are `supplementalDocuments` and `externalId`, and only when `evaluationState` is `pending` or `actionRequired`. All other field/state combinations are rejected with 400 InvalidParameterValue or 409 RuleNotActionable.
 *
 * @summary update a Rule. The PATCH body is discriminated by `kind` and must match the existing rule's kind. For `eduQualification` rules, only `supplementalDocuments` is patchable, and only when `evaluationState == actionRequired`. For `businessVerification` rules, the patchable fields are `supplementalDocuments` and `externalId`, and only when `evaluationState` is `pending` or `actionRequired`. All other field/state combinations are rejected with 400 InvalidParameterValue or 409 RuleNotActionable.
 * x-ms-original-file: 2026-03-17-preview/Rules_Update.json
 */
async function updateAnEduQualificationRuleWithSupplementalDocumentsWhenActionRequired() {
  const credential = new DefaultAzureCredential();
  const client = new BillingTrustClient(credential);
  const result = await client.rules.update(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/billing-edu-rg/providers/Microsoft.Program/educationEnrollments/default",
    "Qualify_Edu",
    {
      kind: "eduQualification",
      supplementalDocuments: [
        "https://trust.svc.cloud.microsoft/v1/documents/55555555-5555-5555-5555-555555555555",
      ],
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update a Rule. The PATCH body is discriminated by `kind` and must match the existing rule's kind. For `eduQualification` rules, only `supplementalDocuments` is patchable, and only when `evaluationState == actionRequired`. For `businessVerification` rules, the patchable fields are `supplementalDocuments` and `externalId`, and only when `evaluationState` is `pending` or `actionRequired`. All other field/state combinations are rejected with 400 InvalidParameterValue or 409 RuleNotActionable.
 *
 * @summary update a Rule. The PATCH body is discriminated by `kind` and must match the existing rule's kind. For `eduQualification` rules, only `supplementalDocuments` is patchable, and only when `evaluationState == actionRequired`. For `businessVerification` rules, the patchable fields are `supplementalDocuments` and `externalId`, and only when `evaluationState` is `pending` or `actionRequired`. All other field/state combinations are rejected with 400 InvalidParameterValue or 409 RuleNotActionable.
 * x-ms-original-file: 2026-03-17-preview/Rules_Update_BV.json
 */
async function patchABusinessVerificationRuleWithExternalIdWhenActionRequiredResolvesAmbiguousMatchByDisambiguatingWithDuns() {
  const credential = new DefaultAzureCredential();
  const client = new BillingTrustClient(credential);
  const result = await client.rules.update(
    "providers/Microsoft.Billing/billingAccounts/abc123:00000000-0000-0000-0000-000000000000_2019-05-31",
    "Verify_Business",
    {
      kind: "businessVerification",
      externalId: { value: "123456789", type: "DUNS" },
      supplementalDocuments: [
        "https://trust.svc.cloud.microsoft/v1/documents/55555555-5555-5555-5555-555555555555",
      ],
    },
  );
  console.log(result);
}

async function main() {
  await updateAnEduQualificationRuleWithSupplementalDocumentsWhenActionRequired();
  await patchABusinessVerificationRuleWithExternalIdWhenActionRequiredResolvesAmbiguousMatchByDisambiguatingWithDuns();
}

main().catch(console.error);
