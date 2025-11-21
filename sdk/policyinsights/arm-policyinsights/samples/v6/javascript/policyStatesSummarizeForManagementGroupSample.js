// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Summarizes policy states for the resources under the management group.
 *
 * @summary Summarizes policy states for the resources under the management group.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_SummarizeManagementGroupScope.json
 */
async function summarizeAtManagementGroupScope() {
  const policyStatesSummaryResource = "latest";
  const managementGroupName = "myManagementGroup";
  const top = 0;
  const fromParam = new Date("2019-10-05T18:00:00Z");
  const to = new Date("2019-10-06T18:00:00Z");
  const filter = "PolicyDefinitionAction eq 'deny' or PolicyDefinitionAction eq 'audit'";
  const options = {
    top,
    fromParam,
    to,
    filter,
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

async function main() {
  await summarizeAtManagementGroupScope();
}

main().catch(console.error);
