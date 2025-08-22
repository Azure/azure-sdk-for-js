// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get a Dapr component resiliency policy.
 *
 * @summary Get a Dapr component resiliency policy.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2025-02-02-preview/examples/DaprComponentResiliencyPolicies_Get.json
 */
async function getDaprComponentResiliencyPolicy(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const environmentName = "myenvironment";
  const componentName = "mydaprcomponent";
  const name = "myresiliencypolicy";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.daprComponentResiliencyPolicies.get(
    resourceGroupName,
    environmentName,
    componentName,
    name,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDaprComponentResiliencyPolicy();
}

main().catch(console.error);
