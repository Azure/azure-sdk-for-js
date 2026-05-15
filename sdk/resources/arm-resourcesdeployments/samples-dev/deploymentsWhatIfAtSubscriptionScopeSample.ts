// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeploymentsClient } from "@azure/arm-resourcesdeployments";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns changes that will be made by the deployment if executed at the scope of the subscription.
 *
 * @summary returns changes that will be made by the deployment if executed at the scope of the subscription.
 * x-ms-original-file: 2025-04-01/PostDeploymentWhatIfOnSubscription.json
 */
async function predictTemplateChangesAtSubscriptionScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000001";
  const client = new DeploymentsClient(credential, subscriptionId);
  const result = await client.deployments.whatIfAtSubscriptionScope("my-deployment", {
    location: "westus",
    properties: {
      mode: "Incremental",
      parameters: {},
      templateLink: { uri: "https://example.com/exampleTemplate.json" },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await predictTemplateChangesAtSubscriptionScope();
}

main().catch(console.error);
