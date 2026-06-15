// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patches a .NET Component using JSON Merge Patch
 *
 * @summary patches a .NET Component using JSON Merge Patch
 * x-ms-original-file: 2025-10-02-preview/DotNetComponents_Patch.json
 */
async function patchNETComponent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.dotNetComponents.update(
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
 * This sample demonstrates how to patches a .NET Component using JSON Merge Patch
 *
 * @summary patches a .NET Component using JSON Merge Patch
 * x-ms-original-file: 2025-10-02-preview/DotNetComponents_Patch_ServiceBind.json
 */
async function patchNETComponentWithServiceBinds(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.dotNetComponents.update(
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
  await patchNETComponent();
  await patchNETComponentWithServiceBinds();
}

main().catch(console.error);
