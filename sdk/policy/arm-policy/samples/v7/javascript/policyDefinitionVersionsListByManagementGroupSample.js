// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation retrieves a list of all the policy definition versions for the given policy definition in the given management group.
 *
 * @summary this operation retrieves a list of all the policy definition versions for the given policy definition in the given management group.
 * x-ms-original-file: 2025-03-01/listPolicyDefinitionVersionsByManagementGroup.json
 */
async function listPolicyDefinitionVersionsByManagementGroup() {
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

async function main() {
  await listPolicyDefinitionVersionsByManagementGroup();
}

main().catch(console.error);
