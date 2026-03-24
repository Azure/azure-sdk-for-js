// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation retrieves a list of all the policy set definition versions for the given policy set definition in a given management group.
 *
 * @summary this operation retrieves a list of all the policy set definition versions for the given policy set definition in a given management group.
 * x-ms-original-file: 2025-03-01/listPolicySetDefinitionVersionsByManagementGroup.json
 */
async function listPolicySetDefinitionsAtManagementGroupLevel() {
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

async function main() {
  await listPolicySetDefinitionsAtManagementGroupLevel();
}

main().catch(console.error);
