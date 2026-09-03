// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a .NET Component in a Managed Environment.
 *
 * @summary creates or updates a .NET Component in a Managed Environment.
 * x-ms-original-file: 2025-10-02-preview/DotNetComponents_CreateOrUpdate.json
 */
async function createOrUpdateNETComponent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.dotNetComponents.createOrUpdate(
    "examplerg",
    "myenvironment",
    "mydotnetcomponent",
    {
      componentType: "AspireDashboard",
      configurations: [{ propertyName: "dashboard-theme", value: "dark" }],
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a .NET Component in a Managed Environment.
 *
 * @summary creates or updates a .NET Component in a Managed Environment.
 * x-ms-original-file: 2025-10-02-preview/DotNetComponents_CreateOrUpdate_ServiceBind.json
 */
async function createOrUpdateNETComponentWithServiceBinds(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.dotNetComponents.createOrUpdate(
    "examplerg",
    "myenvironment",
    "mydotnetcomponent",
    {
      componentType: "AspireDashboard",
      configurations: [{ propertyName: "dashboard-theme", value: "dark" }],
      serviceBinds: [
        {
          name: "yellowcat",
          serviceId:
            "/subscriptions/8efdecc5-919e-44eb-b179-915dca89ebf9/resourceGroups/examplerg/providers/Microsoft.App/managedEnvironments/myenvironment/dotNetComponents/yellowcat",
        },
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateNETComponent();
  await createOrUpdateNETComponentWithServiceBinds();
}

main().catch(console.error);
