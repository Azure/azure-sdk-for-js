// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to summarizes policy states for the subscription level policy set definition.
 *
 * @summary summarizes policy states for the subscription level policy set definition.
 * x-ms-original-file: 2024-10-01/PolicyStates_SummarizeSubscriptionLevelPolicySetDefinitionScope.json
 */
async function summarizeAtPolicySetDefinitionScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.summarizeForPolicySetDefinition(
    "latest",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    "3e3807c1-65c9-49e0-a406-82d8ae3e338c",
    {
      queryOptions: {
        top: 1,
        from: new Date("2019-10-05T18:00:00Z"),
        to: new Date("2019-10-06T18:00:00Z"),
        filter: "PolicyDefinitionAction eq 'deny'",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await summarizeAtPolicySetDefinitionScope();
}

main().catch(console.error);
