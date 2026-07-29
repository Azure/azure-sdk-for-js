// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to queries component policy states for the subscription level policy definition.
 *
 * @summary queries component policy states for the subscription level policy definition.
 * x-ms-original-file: 2024-10-01/ComponentPolicyStates_QuerySubscriptionLevelPolicyDefinitionScope.json
 */
async function queryLatestComponentPolicyStatesAtSubscriptionLevelPolicyDefinitionScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.componentPolicyStates.listQueryResultsForPolicyDefinition(
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    "24813039-7534-408a-9842-eb99f45721b1",
    "latest",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await queryLatestComponentPolicyStatesAtSubscriptionLevelPolicyDefinitionScope();
}

main().catch(console.error);
