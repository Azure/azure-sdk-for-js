// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get a dapr subscription.
 *
 * @summary Get a dapr subscription.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2025-02-02-preview/examples/DaprSubscriptions_Get_DefaultRoute.json
 */
async function getDaprSubscriptionWithBulkSubscribeConfigurationAndScopes(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const environmentName = "myenvironment";
  const name = "mypubsubcomponent";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.daprSubscriptions.get(
    resourceGroupName,
    environmentName,
    name,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Get a dapr subscription.
 *
 * @summary Get a dapr subscription.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2025-02-02-preview/examples/DaprSubscriptions_Get_BulkSubscribeAndScopes.json
 */
async function getDaprSubscriptionWithDefaultRouteOnly(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const environmentName = "myenvironment";
  const name = "mypubsubcomponent";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.daprSubscriptions.get(
    resourceGroupName,
    environmentName,
    name,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Get a dapr subscription.
 *
 * @summary Get a dapr subscription.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2025-02-02-preview/examples/DaprSubscriptions_Get_RouteRulesAndMetadata.json
 */
async function getDaprSubscriptionWithRouteRulesAndMetadata(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const environmentName = "myenvironment";
  const name = "mypubsubcomponent";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.daprSubscriptions.get(
    resourceGroupName,
    environmentName,
    name,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDaprSubscriptionWithBulkSubscribeConfigurationAndScopes();
  await getDaprSubscriptionWithDefaultRouteOnly();
  await getDaprSubscriptionWithRouteRulesAndMetadata();
}

main().catch(console.error);
