// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that it does not exist yet.
 *
 * @summary creates or updates compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that it does not exist yet.
 * x-ms-original-file: 2025-12-01/Compute/createOrUpdate/AKSCompute.json
 */
async function updateAnAKSCompute(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.compute.createOrUpdate("testrg123", "workspaces123", "compute123", {
    location: "eastus",
    properties: {
      description: "some compute",
      computeType: "AKS",
      properties: { agentCount: 4 },
      resourceId:
        "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourcegroups/testrg123/providers/Microsoft.ContainerService/managedClusters/compute123-56826-c9b00420020b2",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that it does not exist yet.
 *
 * @summary creates or updates compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that it does not exist yet.
 * x-ms-original-file: 2025-12-01/Compute/createOrUpdate/AmlCompute.json
 */
async function updateAAMLCompute(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.compute.createOrUpdate("testrg123", "workspaces123", "compute123", {
    location: "eastus",
    properties: {
      description: "some compute",
      computeType: "AmlCompute",
      properties: {
        scaleSettings: { maxNodeCount: 4, minNodeCount: 4, nodeIdleTimeBeforeScaleDown: "PT5M" },
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that it does not exist yet.
 *
 * @summary creates or updates compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that it does not exist yet.
 * x-ms-original-file: 2025-12-01/Compute/createOrUpdate/BasicAKSCompute.json
 */
async function createAnAKSCompute(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.compute.createOrUpdate("testrg123", "workspaces123", "compute123", {
    location: "eastus",
    properties: { computeType: "AKS" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that it does not exist yet.
 *
 * @summary creates or updates compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that it does not exist yet.
 * x-ms-original-file: 2025-12-01/Compute/createOrUpdate/BasicAmlCompute.json
 */
async function createAAMLCompute(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.compute.createOrUpdate("testrg123", "workspaces123", "compute123", {
    location: "eastus",
    properties: {
      computeType: "AmlCompute",
      properties: {
        enableNodePublicIp: true,
        isolatedNetwork: false,
        osType: "Windows",
        remoteLoginPortPublicAccess: "NotSpecified",
        scaleSettings: { maxNodeCount: 1, minNodeCount: 0, nodeIdleTimeBeforeScaleDown: "PT5M" },
        virtualMachineImage: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Compute/galleries/myImageGallery/images/myImageDefinition/versions/0.0.1",
        },
        vmPriority: "Dedicated",
        vmSize: "STANDARD_NC6",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that it does not exist yet.
 *
 * @summary creates or updates compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that it does not exist yet.
 * x-ms-original-file: 2025-12-01/Compute/createOrUpdate/BasicDataFactoryCompute.json
 */
async function createADataFactoryCompute(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.compute.createOrUpdate("testrg123", "workspaces123", "compute123", {
    location: "eastus",
    properties: { computeType: "DataFactory" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that it does not exist yet.
 *
 * @summary creates or updates compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that it does not exist yet.
 * x-ms-original-file: 2025-12-01/Compute/createOrUpdate/ComputeInstance.json
 */
async function createAnComputeInstanceCompute(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.compute.createOrUpdate("testrg123", "workspaces123", "compute123", {
    location: "eastus",
    properties: {
      computeType: "ComputeInstance",
      properties: {
        applicationSharingPolicy: "Personal",
        computeInstanceAuthorizationType: "personal",
        customServices: [
          {
            name: "rstudio-workbench",
            docker: { privileged: true },
            endpoints: [
              {
                name: "connect",
                hostIp: undefined,
                published: 4444,
                target: 8787,
                protocol: "http",
              },
            ],
            environmentVariables: {
              RSP_LICENSE: { type: "local", value: "XXXX-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX" },
            },
            image: { type: "docker", reference: "ghcr.io/azure/rstudio-workbench:latest" },
            kernel: {
              argv: ["option1", "option2", "option3"],
              displayName: "TestKernel",
              language: "python",
            },
            volumes: [
              {
                type: "bind",
                readOnly: true,
                source: "/mnt/azureuser/",
                target: "/home/testuser/",
              },
            ],
          },
        ],
        enableSSO: true,
        personalComputeInstanceSettings: {
          assignedUser: {
            objectId: "00000000-0000-0000-0000-000000000000",
            tenantId: "00000000-0000-0000-0000-000000000000",
          },
        },
        sshSettings: { sshPublicAccess: "Disabled" },
        subnet: { id: "test-subnet-resource-id" },
        vmSize: "STANDARD_NC6",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that it does not exist yet.
 *
 * @summary creates or updates compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that it does not exist yet.
 * x-ms-original-file: 2025-12-01/Compute/createOrUpdate/ComputeInstanceMinimal.json
 */
async function createAnComputeInstanceComputeWithMinimalInputs(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.compute.createOrUpdate("testrg123", "workspaces123", "compute123", {
    location: "eastus",
    properties: { computeType: "ComputeInstance", properties: { vmSize: "STANDARD_NC6" } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that it does not exist yet.
 *
 * @summary creates or updates compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that it does not exist yet.
 * x-ms-original-file: 2025-12-01/Compute/createOrUpdate/ComputeInstanceWithSchedules.json
 */
async function createAnComputeInstanceComputeWithSchedules(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.compute.createOrUpdate("testrg123", "workspaces123", "compute123", {
    location: "eastus",
    properties: {
      computeType: "ComputeInstance",
      properties: {
        applicationSharingPolicy: "Personal",
        computeInstanceAuthorizationType: "personal",
        personalComputeInstanceSettings: {
          assignedUser: {
            objectId: "00000000-0000-0000-0000-000000000000",
            tenantId: "00000000-0000-0000-0000-000000000000",
          },
        },
        schedules: {
          computeStartStop: [
            {
              action: "Stop",
              cron: {
                expression: "0 18 * * *",
                startTime: "2021-04-23T01:30:00",
                timeZone: "Pacific Standard Time",
              },
              status: "Enabled",
              triggerType: "Cron",
            },
          ],
        },
        sshSettings: { sshPublicAccess: "Disabled" },
        vmSize: "STANDARD_NC6",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that it does not exist yet.
 *
 * @summary creates or updates compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that it does not exist yet.
 * x-ms-original-file: 2025-12-01/Compute/createOrUpdate/KubernetesCompute.json
 */
async function attachAKubernetesCompute(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.compute.createOrUpdate("testrg123", "workspaces123", "compute123", {
    location: "eastus",
    properties: {
      description: "some compute",
      computeType: "Kubernetes",
      properties: {
        defaultInstanceType: "defaultInstanceType",
        instanceTypes: {
          defaultInstanceType: {
            nodeSelector: {},
            resources: {
              limits: { cpu: "1", memory: "4Gi" },
              requests: { cpu: "1", memory: "4Gi" },
            },
          },
        },
        namespace: "default",
      },
      resourceId:
        "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourcegroups/testrg123/providers/Microsoft.ContainerService/managedClusters/compute123-56826-c9b00420020b2",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateAnAKSCompute();
  await updateAAMLCompute();
  await createAnAKSCompute();
  await createAAMLCompute();
  await createADataFactoryCompute();
  await createAnComputeInstanceCompute();
  await createAnComputeInstanceComputeWithMinimalInputs();
  await createAnComputeInstanceComputeWithSchedules();
  await attachAKubernetesCompute();
}

main().catch(console.error);
