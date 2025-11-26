// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Summarizes policy states for the subscription level policy set definition.
 *
 * @summary Summarizes policy states for the subscription level policy set definition.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_SummarizeSubscriptionLevelPolicySetDefinitionScope.json
 */
async function summarizeAtPolicySetDefinitionScope() {
  const policyStatesSummaryResource = "latest";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const policySetDefinitionName = "3e3807c1-65c9-49e0-a406-82d8ae3e338c";
  const top = 1;
  const fromParam = new Date("2019-10-05T18:00:00Z");
  const to = new Date("2019-10-06T18:00:00Z");
  const filter = "PolicyDefinitionAction eq 'deny'";
  const options = {
    queryOptions: {
      top,
      from: fromParam,
      to,
      filter,
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.summarizeForPolicySetDefinition(
    policyStatesSummaryResource,
    subscriptionId,
    policySetDefinitionName,
    options,
  );
  console.log(result);
}

async function main() {
  await summarizeAtPolicySetDefinitionScope();
}

main().catch(console.error);
