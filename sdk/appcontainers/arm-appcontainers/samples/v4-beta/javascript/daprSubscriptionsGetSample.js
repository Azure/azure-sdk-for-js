// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a dapr subscription.
 *
 * @summary get a dapr subscription.
 * x-ms-original-file: 2025-10-02-preview/DaprSubscriptions_Get_BulkSubscribeAndScopes.json
 */
async function getDaprSubscriptionWithDefaultRouteOnly() {
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
async function getDaprSubscriptionWithBulkSubscribeConfigurationAndScopes() {
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
async function getDaprSubscriptionWithRouteRulesAndMetadata() {
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

async function main() {
  await getDaprSubscriptionWithDefaultRouteOnly();
  await getDaprSubscriptionWithBulkSubscribeConfigurationAndScopes();
  await getDaprSubscriptionWithRouteRulesAndMetadata();
}

main().catch(console.error);
