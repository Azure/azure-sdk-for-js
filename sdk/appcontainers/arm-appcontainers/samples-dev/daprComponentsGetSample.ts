// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a dapr component.
 *
 * @summary Get a dapr component.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/stable/2025-01-01/examples/DaprComponents_Get_SecretStoreComponent.json
 */

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getDaprComponentWithSecretStoreComponent(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const environmentName = "myenvironment";
  const componentName = "reddog";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.daprComponents.get(
    resourceGroupName,
    environmentName,
    componentName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Get a dapr component.
 *
 * @summary Get a dapr component.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/stable/2025-01-01/examples/DaprComponents_Get_Secrets.json
 */
async function getDaprComponentWithSecrets(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const environmentName = "myenvironment";
  const componentName = "reddog";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.daprComponents.get(
    resourceGroupName,
    environmentName,
    componentName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDaprComponentWithSecretStoreComponent();
  await getDaprComponentWithSecrets();
}

main().catch(console.error);
