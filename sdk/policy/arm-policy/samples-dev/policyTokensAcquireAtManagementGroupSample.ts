// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation acquires a policy token in the given management group for the given request body.
 *
 * @summary this operation acquires a policy token in the given management group for the given request body.
 * x-ms-original-file: 2025-03-01/acquirePolicyTokenAtManagementGroup.json
 */
async function acquireAPolicyTokenAtManagementGroupLevel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyTokens.acquireAtManagementGroup("MyManagementGroup", {
    operation: {
      httpMethod: "delete",
      uri: "https://management.azure.com/providers/Microsoft.Management/managementGroups/MyManagementGroup/providers/Microsoft.Authorization/roleAssignments/00000000-0000-0000-0000-000000000000?api-version=2022-04-01",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await acquireAPolicyTokenAtManagementGroupLevel();
}

main().catch(console.error);
