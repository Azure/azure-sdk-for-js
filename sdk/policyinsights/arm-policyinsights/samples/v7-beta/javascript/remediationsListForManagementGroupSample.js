// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all remediations for the management group.
 *
 * @summary gets all remediations for the management group.
 * x-ms-original-file: 2024-10-01/Remediations_ListManagementGroupScope.json
 */
async function listRemediationsAtManagementGroupScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.remediations.listForManagementGroup("financeMg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets all remediations for the management group.
 *
 * @summary gets all remediations for the management group.
 * x-ms-original-file: 2024-10-01/Remediations_ListManagementGroupScope_WithQuery.json
 */
async function listRemediationsAtManagementGroupScopeWithQueryParameters() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.remediations.listForManagementGroup("financeMg", {
    queryOptions: {
      top: 1,
      filter:
        "PolicyAssignmentId eq '/providers/microsoft.management/managementGroups/financeMg/providers/microsoft.authorization/policyassignments/b101830944f246d8a14088c5'",
    },
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listRemediationsAtManagementGroupScope();
  await listRemediationsAtManagementGroupScopeWithQueryParameters();
}

main().catch(console.error);
