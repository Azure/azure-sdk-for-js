// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or replaces one RAI binding.
 *
 * @summary creates or replaces one RAI binding.
 * x-ms-original-file: 2026-09-15-preview/PutRaiBinding.json
 */
async function bindAnAzureOpenAIDeploymentToAnACSPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiBindings.createOrUpdate(
    "resource-group",
    "safety-account",
    "chat-guard",
    {
      properties: {
        boundResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resource-group/providers/Microsoft.CognitiveServices/accounts/aoai-account/deployments/chat-prod",
        targetPolicyName: "agent-guard",
      },
    },
    { ifNoneMatch: "*" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or replaces one RAI binding.
 *
 * @summary creates or replaces one RAI binding.
 * x-ms-original-file: 2026-09-15-preview/UpdateRaiBinding.json
 */
async function updateARAIBindingTargetConditionallyAcrossSubscriptions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiBindings.createOrUpdate(
    "resource-group",
    "safety-account",
    "chat-guard",
    {
      properties: {
        boundResourceId:
          "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/target-resource-group/providers/Microsoft.CognitiveServices/accounts/aoai-account/deployments/chat-canary",
        targetPolicyName: "agent-guard-v2",
      },
    },
    { ifMatch: '"00000000-0000-0000-0000-000000000002"' },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await bindAnAzureOpenAIDeploymentToAnACSPolicy();
  await updateARAIBindingTargetConditionallyAcrossSubscriptions();
}

main().catch(console.error);
