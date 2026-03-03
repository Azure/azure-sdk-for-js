// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation lists all the policy set definition versions for all policy set definitions at the management group scope.
 *
 * @summary this operation lists all the policy set definition versions for all policy set definitions at the management group scope.
 * x-ms-original-file: 2025-03-01/listAllPolicySetDefinitionVersionsByManagementGroup.json
 */
async function listAllPolicyDefinitionVersionsAtManagementGroup() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result =
    await client.policySetDefinitionVersions.listAllAtManagementGroup("MyManagementGroup");
  console.log(result);
}

async function main() {
  await listAllPolicyDefinitionVersionsAtManagementGroup();
}

main().catch(console.error);
