// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets all remediations for the management group.
 *
 * @summary Gets all remediations for the management group.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/Remediations_ListManagementGroupScope.json
 */
async function listRemediationsAtManagementGroupScope() {
  const managementGroupId = "financeMg";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.remediations.listForManagementGroup(managementGroupId)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Gets all remediations for the management group.
 *
 * @summary Gets all remediations for the management group.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/Remediations_ListManagementGroupScope_WithQuery.json
 */
async function listRemediationsAtManagementGroupScopeWithQueryParameters() {
  const managementGroupId = "financeMg";
  const top = 1;
  const filter =
    "PolicyAssignmentId eq '/providers/microsoft.management/managementGroups/financeMg/providers/microsoft.authorization/policyassignments/b101830944f246d8a14088c5'";
  const options = {
    top,
    filter,
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.remediations.listForManagementGroup(managementGroupId, options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listRemediationsAtManagementGroupScope();
  await listRemediationsAtManagementGroupScopeWithQueryParameters();
}

main().catch(console.error);
