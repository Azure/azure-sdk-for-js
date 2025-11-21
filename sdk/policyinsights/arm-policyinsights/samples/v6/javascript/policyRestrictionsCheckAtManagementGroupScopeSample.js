// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Checks what restrictions Azure Policy will place on resources within a management group.
 *
 * @summary Checks what restrictions Azure Policy will place on resources within a management group.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyRestrictions_CheckAtManagementGroupScope.json
 */
async function checkPolicyRestrictionsAtManagementGroupScope() {
  const managementGroupId = "financeMg";
  const parameters = {
    pendingFields: [{ field: "type" }],
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyRestrictions.checkAtManagementGroupScope(
    managementGroupId,
    parameters,
  );
  console.log(result);
}

async function main() {
  await checkPolicyRestrictionsAtManagementGroupScope();
}

main().catch(console.error);
