// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to queries policy states for the resources under the management group.
 *
 * @summary queries policy states for the resources under the management group.
 * x-ms-original-file: 2024-10-01/PolicyStates_QueryManagementGroupScope.json
 */
async function queryLatestAtManagementGroupScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForManagementGroup(
    "latest",
    "myManagementGroup",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy states for the resources under the management group.
 *
 * @summary queries policy states for the resources under the management group.
 * x-ms-original-file: 2024-10-01/PolicyStates_QueryManagementGroupScopeNextLink.json
 */
async function queryLatestAtManagementGroupScopeWithNextLink(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForManagementGroup(
    "latest",
    "myManagementGroup",
    { queryOptions: { skipToken: "WpmWfBSvPhkAK6QD" } },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await queryLatestAtManagementGroupScope();
  await queryLatestAtManagementGroupScopeWithNextLink();
}

main().catch(console.error);
