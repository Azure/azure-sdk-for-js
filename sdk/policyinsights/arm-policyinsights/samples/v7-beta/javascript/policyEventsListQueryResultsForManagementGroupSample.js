// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to queries policy events for the resources under the management group.
 *
 * @summary queries policy events for the resources under the management group.
 * x-ms-original-file: 2024-10-01/PolicyEvents_QueryManagementGroupScope.json
 */
async function queryAtManagementGroupScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForManagementGroup(
    "default",
    "myManagementGroup",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy events for the resources under the management group.
 *
 * @summary queries policy events for the resources under the management group.
 * x-ms-original-file: 2024-10-01/PolicyEvents_QueryManagementGroupScopeNextLink.json
 */
async function queryAtManagementGroupScopeWithNextLink() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForManagementGroup(
    "default",
    "myManagementGroup",
    { queryOptions: { skipToken: "WpmWfBSvPhkAK6QD" } },
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
