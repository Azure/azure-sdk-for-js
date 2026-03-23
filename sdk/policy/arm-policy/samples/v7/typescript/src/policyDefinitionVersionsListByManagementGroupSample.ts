// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation retrieves a list of all the policy definition versions for the given policy definition in the given management group.
 *
 * @summary this operation retrieves a list of all the policy definition versions for the given policy definition in the given management group.
 * x-ms-original-file: 2025-03-01/listPolicyDefinitionVersionsByManagementGroup.json
 */
async function listPolicyDefinitionVersionsByManagementGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const resArray = new Array();
  for await (const item of client.policyDefinitionVersions.listByManagementGroup(
    "MyManagementGroup",
    "ResourceNaming",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listPolicyDefinitionVersionsByManagementGroup();
}

main().catch(console.error);
