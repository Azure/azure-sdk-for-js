// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This operation retrieves a list of all the policy set definition versions for the given policy set definition in a given management group.
 *
 * @summary This operation retrieves a list of all the policy set definition versions for the given policy set definition in a given management group.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2024-05-01/examples/listPolicySetDefinitionVersionsByManagementGroup.json
 */

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listPolicySetDefinitionsAtManagementGroupLevel(): Promise<void> {
  const managementGroupName = "MyManagementGroup";
  const policySetDefinitionName = "CostManagement";
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const resArray = new Array();
  for await (const item of client.policySetDefinitionVersions.listByManagementGroup(
    managementGroupName,
    policySetDefinitionName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listPolicySetDefinitionsAtManagementGroupLevel();
}

main().catch(console.error);
