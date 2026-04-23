// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation retrieves the policy set definition version in the given management group with the given name and version.
 *
 * @summary this operation retrieves the policy set definition version in the given management group with the given name and version.
 * x-ms-original-file: 2025-03-01/getPolicySetDefinitionVersionAtManagementGroup.json
 */
async function retrieveAPolicySetDefinitionVersionAtManagementGroupLevel() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policySetDefinitionVersions.getAtManagementGroup(
    "MyManagementGroup",
    "CostManagement",
    "1.2.1",
  );
  console.log(result);
}

async function main() {
  await retrieveAPolicySetDefinitionVersionAtManagementGroupLevel();
}

main().catch(console.error);
