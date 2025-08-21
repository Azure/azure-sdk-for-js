// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to Queries policy events for the resources under the resource group.
 *
 * @summary Queries policy events for the resources under the resource group.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyEvents_QueryResourceGroupScope.json
 */

import type { PolicyEventsListQueryResultsForResourceGroupOptionalParams } from "@azure/arm-policyinsights";
import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function queryAtResourceGroupScope(): Promise<void> {
  const policyEventsResource = "default";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const resourceGroupName = process.env["POLICYINSIGHTS_RESOURCE_GROUP"] || "myResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForResourceGroup(
    policyEventsResource,
    subscriptionId,
    resourceGroupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Queries policy events for the resources under the resource group.
 *
 * @summary Queries policy events for the resources under the resource group.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyEvents_QueryResourceGroupScopeNextLink.json
 */
async function queryAtResourceGroupScopeWithNextLink(): Promise<void> {
  const policyEventsResource = "default";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const resourceGroupName = process.env["POLICYINSIGHTS_RESOURCE_GROUP"] || "myResourceGroup";
  const skipToken = "WpmWfBSvPhkAK6QD";
  const options: PolicyEventsListQueryResultsForResourceGroupOptionalParams = {
    queryOptions: { skipToken },
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEvents.listQueryResultsForResourceGroup(
    policyEventsResource,
    subscriptionId,
    resourceGroupName,
    options,
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
