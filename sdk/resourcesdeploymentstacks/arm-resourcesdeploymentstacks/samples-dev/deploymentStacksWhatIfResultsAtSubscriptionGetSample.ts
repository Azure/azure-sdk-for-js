// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeploymentStacksClient } from "@azure/arm-resourcesdeploymentstacks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the Deployment stack with the given name.
 *
 * @summary gets the Deployment stack with the given name.
 * x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsSubscriptionGet.json
 */
async function getASubscriptionDeploymentStackWhatIfResult(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeploymentStacksClient(credential, subscriptionId);
  const result = await client.deploymentStacksWhatIfResultsAtSubscription.get(
    "simpleDeploymentStackWhatIfResult",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getASubscriptionDeploymentStackWhatIfResult();
}

main().catch(console.error);
