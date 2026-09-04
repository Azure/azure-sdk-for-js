// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation deletes a variable, given its name and the management group it was created in. The scope of a variable is the part of its ID preceding '/providers/Microsoft.Authorization/variables/{variableName}'.
 *
 * @summary this operation deletes a variable, given its name and the management group it was created in. The scope of a variable is the part of its ID preceding '/providers/Microsoft.Authorization/variables/{variableName}'.
 * x-ms-original-file: 2026-01-01-preview/deleteVariableAtManagementGroup.json
 */
async function deleteAVariableAtManagementGroup() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  await client.variables.deleteAtManagementGroup("DevOrg", "DemoTestVariable");
}

async function main() {
  await deleteAVariableAtManagementGroup();
}

main().catch(console.error);
