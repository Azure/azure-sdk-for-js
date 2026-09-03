// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a dapr subscription.
 *
 * @summary get a dapr subscription.
 * x-ms-original-file: 2025-10-02-preview/DaprSubscriptions_Get_BulkSubscribeAndScopes.json
 */
async function getDaprSubscriptionWithDefaultRouteOnly(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.daprSubscriptions.get(
    "examplerg",
    "myenvironment",
    "mypubsubcomponent",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a dapr subscription.
 *
 * @summary get a dapr subscription.
 * x-ms-original-file: 2025-10-02-preview/DaprSubscriptions_Get_DefaultRoute.json
 */
async function getDaprSubscriptionWithBulkSubscribeConfigurationAndScopes(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.daprSubscriptions.get(
    "examplerg",
    "myenvironment",
    "mypubsubcomponent",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a dapr subscription.
 *
 * @summary get a dapr subscription.
 * x-ms-original-file: 2025-10-02-preview/DaprSubscriptions_Get_RouteRulesAndMetadata.json
 */
async function getDaprSubscriptionWithRouteRulesAndMetadata(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.daprSubscriptions.get(
    "examplerg",
    "myenvironment",
    "mypubsubcomponent",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDaprSubscriptionWithDefaultRouteOnly();
  await getDaprSubscriptionWithBulkSubscribeConfigurationAndScopes();
  await getDaprSubscriptionWithRouteRulesAndMetadata();
}

main().catch(console.error);
