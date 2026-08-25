// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation retrieves a single variable value; given its name,  management group it was created at and the variable it's created for.
 *
 * @summary this operation retrieves a single variable value; given its name,  management group it was created at and the variable it's created for.
 * x-ms-original-file: 2026-01-01-preview/getVariableValueAtManagementGroup.json
 */
async function retrieveAVariableValueAtManagementGroup() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.variableValues.getAtManagementGroup(
    "DevOrg",
    "DemoTestVariable",
    "TestValue",
  );
  console.log(result);
}

async function main() {
  await retrieveAVariableValueAtManagementGroup();
}

main().catch(console.error);
