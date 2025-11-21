// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Queries policy events for the resources under the management group.
 *
 * @summary Queries policy events for the resources under the management group.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyEvents_QueryManagementGroupScope.json
 */
async function queryAtManagementGroupScope() {
  const policyEventsResource = "default";
  const managementGroupName = "myManagementGroup";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForManagementGroup(
    policyEventsResource,
    managementGroupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Queries policy events for the resources under the management group.
 *
 * @summary Queries policy events for the resources under the management group.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyEvents_QueryManagementGroupScopeNextLink.json
 */
async function queryAtManagementGroupScopeWithNextLink() {
  const policyEventsResource = "default";
  const managementGroupName = "myManagementGroup";
  const skipToken = "WpmWfBSvPhkAK6QD";
  const options = { queryOptions: { skipToken } };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForManagementGroup(
    policyEventsResource,
    managementGroupName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await queryAtManagementGroupScope();
  await queryAtManagementGroupScopeWithNextLink();
}

main().catch(console.error);
