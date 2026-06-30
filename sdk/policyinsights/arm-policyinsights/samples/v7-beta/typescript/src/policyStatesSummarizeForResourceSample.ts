// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to summarizes policy states for the resource.
 *
 * @summary summarizes policy states for the resource.
 * x-ms-original-file: 2024-10-01/PolicyStates_SummarizeResourceScope.json
 */
async function summarizeAtResourceScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.summarizeForResource(
    "latest",
    "subscriptions/fff10b27-fff3-fff5-fff8-fffbe01e86a5/resourceGroups/myResourceGroup/providers/Microsoft.KeyVault/vaults/my-vault",
    { queryOptions: { top: 2 } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await summarizeAtResourceScope();
}

main().catch(console.error);
