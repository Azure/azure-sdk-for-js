// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to evaluate Azure Policy compliance for a set of hypothetical deployments without creating them.
 *
 * @summary evaluate Azure Policy compliance for a set of hypothetical deployments without creating them.
 * x-ms-original-file: 2026-03-15-preview/EvaluateDeploymentPolicies.json
 */
async function evaluateDeploymentPolicies(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.accounts.evaluateDeploymentPolicies(
    "resourceGroupName",
    "accountName",
    {
      deployments: [
        {
          name: "gpt4o-deployment",
          properties: {
            model: { format: "OpenAI", name: "gpt-4o", version: "2024-11-20" },
            raiPolicyName: "Microsoft.DefaultV2",
          },
        },
        {
          name: "ada-embedding",
          properties: { model: { format: "OpenAI", name: "text-embedding-ada-002", version: "2" } },
        },
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await evaluateDeploymentPolicies();
}

main().catch(console.error);
