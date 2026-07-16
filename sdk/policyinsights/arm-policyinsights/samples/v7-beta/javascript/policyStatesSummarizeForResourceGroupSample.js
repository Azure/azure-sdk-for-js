// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to summarizes policy states for the resources under the resource group.
 *
 * @summary summarizes policy states for the resources under the resource group.
 * x-ms-original-file: 2024-10-01/PolicyStates_SummarizeResourceGroupScope.json
 */
async function summarizeAtResourceGroupScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.summarizeForResourceGroup(
    "latest",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    "myResourceGroup",
  );
  console.log(result);
}

async function main() {
  await summarizeAtResourceGroupScope();
}

main().catch(console.error);
