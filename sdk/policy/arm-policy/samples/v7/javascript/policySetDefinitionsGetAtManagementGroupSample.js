// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation retrieves the policy set definition in the given management group with the given name.
 *
 * @summary this operation retrieves the policy set definition in the given management group with the given name.
 * x-ms-original-file: 2025-03-01/getPolicySetDefinitionAtManagementGroup.json
 */
async function retrieveAPolicySetDefinitionAtManagementGroupLevel() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policySetDefinitions.getAtManagementGroup(
    "MyManagementGroup",
    "CostManagement",
  );
  console.log(result);
}

async function main() {
  await retrieveAPolicySetDefinitionAtManagementGroupLevel();
}

main().catch(console.error);
