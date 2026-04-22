// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation retrieves the policy definition version in the given management group with the given name.
 *
 * @summary this operation retrieves the policy definition version in the given management group with the given name.
 * x-ms-original-file: 2025-03-01/getPolicyDefinitionVersionAtManagementGroup.json
 */
async function retrieveAPolicyDefinitionVersionAtManagementGroupLevel() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyDefinitionVersions.getAtManagementGroup(
    "MyManagementGroup",
    "ResourceNaming",
    "1.2.1",
  );
  console.log(result);
}

async function main() {
  await retrieveAPolicyDefinitionVersionAtManagementGroupLevel();
}

main().catch(console.error);
