// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to Summarizes policy states for the resources under the management group.
 *
 * @summary Summarizes policy states for the resources under the management group.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_SummarizeManagementGroupScope.json
 */

import type { PolicyStatesSummarizeForManagementGroupOptionalParams } from "@azure/arm-policyinsights";
import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function summarizeAtManagementGroupScope(): Promise<void> {
  const policyStatesSummaryResource = "latest";
  const managementGroupName = "myManagementGroup";
  const top = 0;
  const from = new Date("2019-10-05T18:00:00Z");
  const to = new Date("2019-10-06T18:00:00Z");
  const filter = "PolicyDefinitionAction eq 'deny' or PolicyDefinitionAction eq 'audit'";
  const options: PolicyStatesSummarizeForManagementGroupOptionalParams = {
    queryOptions: {
      top,
      from,
      to,
      filter,
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.summarizeForManagementGroup(
    policyStatesSummaryResource,
    managementGroupName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await summarizeAtManagementGroupScope();
}

main().catch(console.error);
