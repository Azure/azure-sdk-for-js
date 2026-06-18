// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to queries policy events for the resources under the resource group.
 *
 * @summary queries policy events for the resources under the resource group.
 * x-ms-original-file: 2024-10-01/PolicyEvents_QueryResourceGroupScope.json
 */
async function queryAtResourceGroupScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForResourceGroup(
    "default",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    "myResourceGroup",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to queries policy events for the resources under the resource group.
 *
 * @summary queries policy events for the resources under the resource group.
 * x-ms-original-file: 2024-10-01/PolicyEvents_QueryResourceGroupScopeNextLink.json
 */
async function queryAtResourceGroupScopeWithNextLink(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForResourceGroup(
    "default",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    "myResourceGroup",
    { skipToken: "WpmWfBSvPhkAK6QD" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await queryAtResourceGroupScope();
  await queryAtResourceGroupScopeWithNextLink();
}

main().catch(console.error);
