// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation deletes the policy set definition version in the given management group with the given name and version.
 *
 * @summary this operation deletes the policy set definition version in the given management group with the given name and version.
 * x-ms-original-file: 2025-03-01/deletePolicySetDefinitionVersionAtManagementGroup.json
 */
async function deleteAPolicySetDefinitionVersionAtManagementGroupLevel() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  await client.policySetDefinitionVersions.deleteAtManagementGroup(
    "MyManagementGroup",
    "CostManagement",
    "1.2.1",
  );
}

async function main() {
  await deleteAPolicySetDefinitionVersionAtManagementGroupLevel();
}

main().catch(console.error);
