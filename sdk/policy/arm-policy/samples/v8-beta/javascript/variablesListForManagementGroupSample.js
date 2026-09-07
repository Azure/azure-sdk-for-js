// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation retrieves the list of all variables applicable to the management group.
 *
 * @summary this operation retrieves the list of all variables applicable to the management group.
 * x-ms-original-file: 2026-01-01-preview/listVariablesForManagementGroup.json
 */
async function listVariablesThatApplyToAManagementGroup() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const resArray = new Array();
  for await (const item of client.variables.listForManagementGroup("DevOrg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listVariablesThatApplyToAManagementGroup();
}

main().catch(console.error);
