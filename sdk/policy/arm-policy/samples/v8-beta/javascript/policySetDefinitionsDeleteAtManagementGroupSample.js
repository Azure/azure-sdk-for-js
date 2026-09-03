// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation deletes the policy set definition in the given management group with the given name.
 *
 * @summary this operation deletes the policy set definition in the given management group with the given name.
 * x-ms-original-file: 2026-01-01-preview/deletePolicySetDefinitionAtManagementGroup.json
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
