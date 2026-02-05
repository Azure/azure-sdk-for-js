// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation deletes the policy set definition in the given management group with the given name.
 *
 * @summary this operation deletes the policy set definition in the given management group with the given name.
 * x-ms-original-file: 2025-03-01/deletePolicySetDefinitionAtManagementGroup.json
 */
async function deleteAPolicySetDefinitionAtManagementGroupLevel() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  await client.policySetDefinitions.deleteAtManagementGroup("MyManagementGroup", "CostManagement");
}

async function main() {
  await deleteAPolicySetDefinitionAtManagementGroupLevel();
}

main().catch(console.error);
