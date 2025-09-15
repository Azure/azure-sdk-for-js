// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Summarizes policy states for the resources under the resource group.
 *
 * @summary Summarizes policy states for the resources under the resource group.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_SummarizeResourceGroupScope.json
 */

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function summarizeAtResourceGroupScope(): Promise<void> {
  const policyStatesSummaryResource = "latest";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const resourceGroupName = process.env["POLICYINSIGHTS_RESOURCE_GROUP"] || "myResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.summarizeForResourceGroup(
    policyStatesSummaryResource,
    subscriptionId,
    resourceGroupName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await summarizeAtResourceGroupScope();
}

main().catch(console.error);
