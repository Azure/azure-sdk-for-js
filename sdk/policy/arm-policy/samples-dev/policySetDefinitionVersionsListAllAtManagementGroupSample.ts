// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This operation lists all the policy set definition versions for all policy set definitions at the management group scope.
 *
 * @summary This operation lists all the policy set definition versions for all policy set definitions at the management group scope.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2024-05-01/examples/listAllPolicySetDefinitionVersionsByManagementGroup.json
 */

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAllPolicyDefinitionVersionsAtManagementGroup(): Promise<void> {
  const managementGroupName = "MyManagementGroup";
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result =
    await client.policySetDefinitionVersions.listAllAtManagementGroup(
      managementGroupName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await listAllPolicyDefinitionVersionsAtManagementGroup();
}

main().catch(console.error);
