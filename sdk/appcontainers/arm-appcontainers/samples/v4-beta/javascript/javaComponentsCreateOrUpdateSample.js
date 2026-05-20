// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a Java Component in a Managed Environment.
 *
 * @summary creates or updates a Java Component in a Managed Environment.
 * x-ms-original-file: 2025-10-02-preview/JavaComponents_CreateOrUpdate.json
 */
async function createOrUpdateJavaComponent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.javaComponents.createOrUpdate(
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
 * This sample demonstrates how to creates or updates a Java Component in a Managed Environment.
 *
 * @summary creates or updates a Java Component in a Managed Environment.
 * x-ms-original-file: 2025-10-02-preview/JavaComponents_CreateOrUpdate_ServiceBind.json
 */
async function createOrUpdateJavaComponentWithServiceBinds() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.javaComponents.createOrUpdate(
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

async function main() {
  await createOrUpdateJavaComponent();
  await createOrUpdateJavaComponentWithServiceBinds();
}

main().catch(console.error);
