// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to summarizes policy states for the resources under the management group.
 *
 * @summary summarizes policy states for the resources under the management group.
 * x-ms-original-file: 2024-10-01/PolicyStates_SummarizeManagementGroupScope.json
 */
async function summarizeAtManagementGroupScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.summarizeForManagementGroup(
    "latest",
    "myManagementGroup",
    {
      queryOptions: {
        top: 0,
        from: new Date("2019-10-05T18:00:00Z"),
        to: new Date("2019-10-06T18:00:00Z"),
        filter: "PolicyDefinitionAction eq 'deny' or PolicyDefinitionAction eq 'audit'",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await summarizeAtManagementGroupScope();
}

main().catch(console.error);
