// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DotNetComponent,
  ContainerAppsAPIClient,
} from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a .NET Component in a Managed Environment.
 *
 * @summary Creates or updates a .NET Component in a Managed Environment.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2025-02-02-preview/examples/DotNetComponents_CreateOrUpdate.json
 */
async function createOrUpdateNetComponent(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const environmentName = "myenvironment";
  const name = "mydotnetcomponent";
  const dotNetComponentEnvelope: DotNetComponent = {
    componentType: "AspireDashboard",
    configurations: [{ propertyName: "dashboard-theme", value: "dark" }],
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.dotNetComponents.beginCreateOrUpdateAndWait(
    resourceGroupName,
    environmentName,
    name,
    dotNetComponentEnvelope,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a .NET Component in a Managed Environment.
 *
 * @summary Creates or updates a .NET Component in a Managed Environment.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2025-02-02-preview/examples/DotNetComponents_CreateOrUpdate_ServiceBind.json
 */
async function createOrUpdateNetComponentWithServiceBinds(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const environmentName = "myenvironment";
  const name = "mydotnetcomponent";
  const dotNetComponentEnvelope: DotNetComponent = {
    componentType: "AspireDashboard",
    configurations: [{ propertyName: "dashboard-theme", value: "dark" }],
    serviceBinds: [
      {
        name: "yellowcat",
        serviceId:
          "/subscriptions/8efdecc5-919e-44eb-b179-915dca89ebf9/resourceGroups/examplerg/providers/Microsoft.App/managedEnvironments/myenvironment/dotNetComponents/yellowcat",
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.dotNetComponents.beginCreateOrUpdateAndWait(
    resourceGroupName,
    environmentName,
    name,
    dotNetComponentEnvelope,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateNetComponent();
  await createOrUpdateNetComponentWithServiceBinds();
}

main().catch(console.error);
