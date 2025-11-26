// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Summarizes policy states for the resource.
 *
 * @summary Summarizes policy states for the resource.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_SummarizeResourceScope.json
 */
async function summarizeAtResourceScope() {
  const policyStatesSummaryResource = "latest";
  const resourceId =
    "subscriptions/fff10b27-fff3-fff5-fff8-fffbe01e86a5/resourceGroups/myResourceGroup/providers/Microsoft.KeyVault/vaults/my-vault";
  const top = 2;
  const options = {
    queryOptions: { top },
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.summarizeForResource(
    policyStatesSummaryResource,
    resourceId,
    options,
  );
  console.log(result);
}

async function main() {
  await summarizeAtResourceScope();
}

main().catch(console.error);
