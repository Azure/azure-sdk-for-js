// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This operation retrieves the policy set definition version in the given management group with the given name and version.
 *
 * @summary This operation retrieves the policy set definition version in the given management group with the given name and version.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2024-05-01/examples/getPolicySetDefinitionVersionAtManagementGroup.json
 */

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function retrieveAPolicySetDefinitionVersionAtManagementGroupLevel(): Promise<void> {
  const managementGroupName = "MyManagementGroup";
  const policySetDefinitionName = "CostManagement";
  const policyDefinitionVersion = "1.2.1";
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policySetDefinitionVersions.getAtManagementGroup(
    managementGroupName,
    policySetDefinitionName,
    policyDefinitionVersion,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveAPolicySetDefinitionVersionAtManagementGroupLevel();
}

main().catch(console.error);
