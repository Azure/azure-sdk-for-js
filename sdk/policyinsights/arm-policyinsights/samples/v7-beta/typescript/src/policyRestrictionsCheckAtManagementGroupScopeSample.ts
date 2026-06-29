// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks what restrictions Azure Policy will place on resources within a management group.
 *
 * @summary checks what restrictions Azure Policy will place on resources within a management group.
 * x-ms-original-file: 2024-10-01/PolicyRestrictions_CheckAtManagementGroupScope.json
 */
async function checkPolicyRestrictionsAtManagementGroupScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyRestrictions.checkAtManagementGroupScope("financeMg", {
    pendingFields: [{ field: "type" }],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await checkPolicyRestrictionsAtManagementGroupScope();
}

main().catch(console.error);
