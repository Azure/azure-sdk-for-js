// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Queries policy states for the resources under the management group.
 *
 * @summary Queries policy states for the resources under the management group.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_QueryManagementGroupScope.json
 */
async function queryLatestAtManagementGroupScope() {
  const policyStatesResource = "latest";
  const managementGroupName = "myManagementGroup";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.listQueryResultsForManagementGroup(
    policyStatesResource,
    managementGroupName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Queries policy states for the resources under the management group.
 *
 * @summary Queries policy states for the resources under the management group.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_QueryManagementGroupScopeNextLink.json
 */
async function queryLatestAtManagementGroupScopeWithNextLink() {
  const policyStatesResource = "latest";
  const managementGroupName = "myManagementGroup";
  const skipToken = "WpmWfBSvPhkAK6QD";
  const options = { skipToken };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.listQueryResultsForManagementGroup(
    policyStatesResource,
    managementGroupName,
    options,
  );
  console.log(result);
}

async function main() {
  await queryLatestAtManagementGroupScope();
  await queryLatestAtManagementGroupScopeWithNextLink();
}

main().catch(console.error);
