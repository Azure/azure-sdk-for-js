// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This operation retrieves the policy definition version in the given management group with the given name.
 *
 * @summary This operation retrieves the policy definition version in the given management group with the given name.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2024-05-01/examples/getPolicyDefinitionVersionAtManagementGroup.json
 */

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function retrieveAPolicyDefinitionVersionAtManagementGroupLevel(): Promise<void> {
  const managementGroupName = "MyManagementGroup";
  const policyDefinitionName = "ResourceNaming";
  const policyDefinitionVersion = "1.2.1";
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyDefinitionVersions.getAtManagementGroup(
    managementGroupName,
    policyDefinitionName,
    policyDefinitionVersion,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveAPolicyDefinitionVersionAtManagementGroupLevel();
}

main().catch(console.error);
