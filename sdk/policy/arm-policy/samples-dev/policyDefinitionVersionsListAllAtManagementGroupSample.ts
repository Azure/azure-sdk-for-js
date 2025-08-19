// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This operation lists all the policy definition versions for all policy definitions at the management group scope.
 *
 * @summary This operation lists all the policy definition versions for all policy definitions at the management group scope.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2024-05-01/examples/listAllPolicyDefinitionVersionsByManagementGroup.json
 */

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAllPolicyDefinitionVersionsAtManagementGroup(): Promise<void> {
  const managementGroupName = "MyManagementGroup";
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result =
    await client.policyDefinitionVersions.listAllAtManagementGroup(
      managementGroupName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await listAllPolicyDefinitionVersionsAtManagementGroup();
}

main().catch(console.error);
