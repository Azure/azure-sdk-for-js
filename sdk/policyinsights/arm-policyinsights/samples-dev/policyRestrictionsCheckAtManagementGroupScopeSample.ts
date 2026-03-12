// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Checks what restrictions Azure Policy will place on resources within a management group.
 *
 * @summary Checks what restrictions Azure Policy will place on resources within a management group.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyRestrictions_CheckAtManagementGroupScope.json
 */

import type { CheckManagementGroupRestrictionsRequest } from "@azure/arm-policyinsights";
import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function checkPolicyRestrictionsAtManagementGroupScope(): Promise<void> {
  const managementGroupId = "financeMg";
  const parameters: CheckManagementGroupRestrictionsRequest = {
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

async function main(): Promise<void> {
  await checkPolicyRestrictionsAtManagementGroupScope();
}

main().catch(console.error);
