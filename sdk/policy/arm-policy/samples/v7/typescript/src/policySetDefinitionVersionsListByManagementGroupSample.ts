// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation retrieves a list of all the policy set definition versions for the given policy set definition in a given management group.
 *
 * @summary this operation retrieves a list of all the policy set definition versions for the given policy set definition in a given management group.
 * x-ms-original-file: 2025-03-01/listPolicySetDefinitionVersionsByManagementGroup.json
 */
async function listPolicySetDefinitionsAtManagementGroupLevel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const resArray = new Array();
  for await (const item of client.policySetDefinitionVersions.listByManagementGroup(
    "MyManagementGroup",
    "CostManagement",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listPolicySetDefinitionsAtManagementGroupLevel();
}

main().catch(console.error);
