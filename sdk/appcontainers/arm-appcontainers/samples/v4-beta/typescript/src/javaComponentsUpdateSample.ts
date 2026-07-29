// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patches a Java Component using JSON Merge Patch
 *
 * @summary patches a Java Component using JSON Merge Patch
 * x-ms-original-file: 2025-10-02-preview/JavaComponents_Patch.json
 */
async function patchJavaComponent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.javaComponents.update(
    "examplerg",
    "myenvironment",
    "myjavacomponent",
    {
      properties: {
        componentType: "SpringBootAdmin",
        configurations: [
          { propertyName: "spring.boot.admin.ui.enable-toasts", value: "true" },
          { propertyName: "spring.boot.admin.monitor.status-interval", value: "10000ms" },
        ],
        scale: { maxReplicas: 1, minReplicas: 1 },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to patches a Java Component using JSON Merge Patch
 *
 * @summary patches a Java Component using JSON Merge Patch
 * x-ms-original-file: 2025-10-02-preview/JavaComponents_Patch_ServiceBind.json
 */
async function patchJavaComponentWithServiceBinds(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.javaComponents.update(
    "examplerg",
    "myenvironment",
    "myjavacomponent",
    {
      properties: {
        componentType: "SpringBootAdmin",
        configurations: [
          { propertyName: "spring.boot.admin.ui.enable-toasts", value: "true" },
          { propertyName: "spring.boot.admin.monitor.status-interval", value: "10000ms" },
        ],
        scale: { maxReplicas: 1, minReplicas: 1 },
        serviceBinds: [
          {
            name: "yellowcat",
            serviceId:
              "/subscriptions/8efdecc5-919e-44eb-b179-915dca89ebf9/resourceGroups/examplerg/providers/Microsoft.App/managedEnvironments/myenvironment/javaComponents/yellowcat",
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchJavaComponent();
  await patchJavaComponentWithServiceBinds();
}

main().catch(console.error);
