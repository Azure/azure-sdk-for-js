// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks what restrictions Azure Policy will place on resources within a management group.
 *
 * @summary checks what restrictions Azure Policy will place on resources within a management group.
 * x-ms-original-file: 2024-10-01/PolicyRestrictions_CheckAtManagementGroupScope.json
 */
async function checkPolicyRestrictionsAtManagementGroupScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyRestrictions.checkAtManagementGroupScope("financeMg", {
    pendingFields: [{ field: "type" }],
  });
  console.log(result);
}

async function main() {
  await checkPolicyRestrictionsAtManagementGroupScope();
}

main().catch(console.error);
