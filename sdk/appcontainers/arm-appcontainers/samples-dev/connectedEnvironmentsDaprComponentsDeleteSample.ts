// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a Dapr Component from a connected environment.
 *
 * @summary Delete a Dapr Component from a connected environment.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/stable/2025-01-01/examples/ConnectedEnvironmentsDaprComponents_Delete.json
 */

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteDaprComponent(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const connectedEnvironmentName = "myenvironment";
  const componentName = "reddog";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.connectedEnvironmentsDaprComponents.delete(
    resourceGroupName,
    connectedEnvironmentName,
    componentName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteDaprComponent();
}

main().catch(console.error);
