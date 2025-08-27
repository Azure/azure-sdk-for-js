// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a Deployment stack with a given name at Subscription scope.
 *
 * @summary Gets a Deployment stack with a given name at Subscription scope.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackSubscriptionGet.json
 */

import { DeploymentStacksClient } from "@azure/arm-resourcesdeploymentstacks";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deploymentStacksSubscriptionGet(): Promise<void> {
  const subscriptionId =
    process.env["RESOURCESDEPLOYMENTSTACKS_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const deploymentStackName = "simpleDeploymentStack";
  const credential = new DefaultAzureCredential();
  const client = new DeploymentStacksClient(credential, subscriptionId);
  const result = await client.deploymentStacks.getAtSubscription(deploymentStackName);
  console.log(result);
}

async function main(): Promise<void> {
  await deploymentStacksSubscriptionGet();
}

main().catch(console.error);
