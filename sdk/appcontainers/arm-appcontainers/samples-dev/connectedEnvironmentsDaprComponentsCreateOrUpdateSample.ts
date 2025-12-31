// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DaprComponent} from "@azure/arm-appcontainers";
import {
  ContainerAppsAPIClient,
} from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a Dapr Component in a connected environment.
 *
 * @summary Creates or updates a Dapr Component in a connected environment.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/ContainerApps/stable/2025-07-01/examples/ConnectedEnvironmentsDaprComponents_CreateOrUpdate.json
 */
async function createOrUpdateDaprComponent(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const connectedEnvironmentName = "myenvironment";
  const componentName = "reddog";
  const daprComponentEnvelope: DaprComponent = {
    componentType: "state.azure.cosmosdb",
    ignoreErrors: false,
    initTimeout: "50s",
    metadata: [
      { name: "url", value: "<COSMOS-URL>" },
      { name: "database", value: "itemsDB" },
      { name: "collection", value: "items" },
      { name: "masterkey", secretRef: "masterkey" },
    ],
    scopes: ["container-app-1", "container-app-2"],
    secrets: [{ name: "masterkey", value: "keyvalue" }],
    version: "v1",
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result =
    await client.connectedEnvironmentsDaprComponents.beginCreateOrUpdateAndWait(
      resourceGroupName,
      connectedEnvironmentName,
      componentName,
      daprComponentEnvelope,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateDaprComponent();
}

main().catch(console.error);
