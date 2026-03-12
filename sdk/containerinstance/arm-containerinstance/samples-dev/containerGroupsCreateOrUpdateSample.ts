// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update container groups with specified configurations.
 *
 * @summary Create or update container groups with specified configurations.
 * x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/preview/2024-05-01-preview/examples/ContainerGroupCreateConfidential.json
 */

import type { ContainerGroup } from "@azure/arm-containerinstance";
import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function confidentialContainerGroup(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERINSTANCE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERINSTANCE_RESOURCE_GROUP"] || "demo";
  const containerGroupName = "demo1";
  const containerGroup: ContainerGroup = {
    confidentialComputeProperties: {
      ccePolicy:
        "eyJhbGxvd19hbGwiOiB0cnVlLCAiY29udGFpbmVycyI6IHsibGVuZ3RoIjogMCwgImVsZW1lbnRzIjogbnVsbH19",
    },
    containers: [
      {
        name: "accdemo",
        command: [],
        environmentVariables: [],
        image: "confiimage",
        ports: [{ port: 8000 }],
        resources: { requests: { cpu: 1, memoryInGB: 1.5 } },
        securityContext: {
          capabilities: { add: ["CAP_NET_ADMIN"] },
          privileged: false,
        },
      },
    ],
    imageRegistryCredentials: [],
    ipAddress: { type: "Public", ports: [{ port: 8000, protocol: "TCP" }] },
    location: "westeurope",
    osType: "Linux",
    sku: "Confidential",
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containerGroups.beginCreateOrUpdateAndWait(
    resourceGroupName,
    containerGroupName,
    containerGroup,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or update container groups with specified configurations.
 *
 * @summary Create or update container groups with specified configurations.
 * x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/preview/2024-05-01-preview/examples/ContainerGroupCreateOrUpdateStandbyPool.json
 */
async function containerGroupCreateOrUpdateWithStandbyPool(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERINSTANCE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERINSTANCE_RESOURCE_GROUP"] || "demo";
  const containerGroupName = "demo1";
  const containerGroup: ContainerGroup = {
    containerGroupProfile: {
      id: "/subscriptions/subid/resourceGroups/demo/providers/Microsoft.ContainerInstance/containerGroupProfiles/democgp",
      revision: 1,
    },
    containers: [{ name: "demo1", configMap: { keyValuePairs: { newkey: "value" } } }],
    location: "west us",
    standbyPoolProfile: {
      id: "/subscriptions/subid/resourceGroups/demo/providers/Microsoft.StandbyPool/standbyContainerGroupPools/demopool",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containerGroups.beginCreateOrUpdateAndWait(
    resourceGroupName,
    containerGroupName,
    containerGroup,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or update container groups with specified configurations.
 *
 * @summary Create or update container groups with specified configurations.
 * x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/preview/2024-05-01-preview/examples/ContainerGroupExtensions.json
 */
async function containerGroupCreateWithExtensions(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERINSTANCE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERINSTANCE_RESOURCE_GROUP"] || "demo";
  const containerGroupName = "demo1";
  const containerGroup: ContainerGroup = {
    containers: [
      {
        name: "demo1",
        command: [],
        environmentVariables: [],
        image: "nginx",
        ports: [{ port: 80 }],
        resources: { requests: { cpu: 1, memoryInGB: 1.5 } },
      },
    ],
    imageRegistryCredentials: [],
    ipAddress: { type: "Private", ports: [{ port: 80, protocol: "TCP" }] },
    location: "eastus2",
    osType: "Linux",
    subnetIds: [
      {
        id: "/subscriptions/00000000-0000-0000-0000-00000000/resourceGroups/test-rg/providers/Microsoft.Network/virtualNetworks/test-rg-vnet/subnets/test-subnet",
      },
    ],
    extensions: [
      {
        name: "kube-proxy",
        extensionType: "kube-proxy",
        protectedSettings: { kubeConfig: "<kubeconfig encoded string>" },
        settings: { clusterCidr: "10.240.0.0/16", kubeVersion: "v1.9.10" },
        version: "1.0",
      },
      {
        name: "vk-realtime-metrics",
        extensionType: "realtime-metrics",
        version: "1.0",
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containerGroups.beginCreateOrUpdateAndWait(
    resourceGroupName,
    containerGroupName,
    containerGroup,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or update container groups with specified configurations.
 *
 * @summary Create or update container groups with specified configurations.
 * x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/preview/2024-05-01-preview/examples/ContainerGroupEncryptionProperties.json
 */
async function containerGroupWithEncryptionProperties(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERINSTANCE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERINSTANCE_RESOURCE_GROUP"] || "demo";
  const containerGroupName = "demo1";
  const containerGroup: ContainerGroup = {
    containers: [
      {
        name: "demo1",
        command: [],
        environmentVariables: [],
        image: "nginx",
        ports: [{ port: 80 }],
        resources: { requests: { cpu: 1, memoryInGB: 1.5 } },
      },
    ],
    encryptionProperties: {
      identity:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/test-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/container-group-identity",
      keyName: "test-key",
      keyVersion: "<key version>",
      vaultBaseUrl: "https://testkeyvault.vault.azure.net",
    },
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000000000000000000000000000/resourcegroups/testRg/providers/MicrosoftManagedIdentity/userAssignedIdentities/containerGroupIdentity":
          {},
      },
    },
    imageRegistryCredentials: [],
    ipAddress: { type: "Public", ports: [{ port: 80, protocol: "TCP" }] },
    location: "eastus2",
    osType: "Linux",
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containerGroups.beginCreateOrUpdateAndWait(
    resourceGroupName,
    containerGroupName,
    containerGroup,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or update container groups with specified configurations.
 *
 * @summary Create or update container groups with specified configurations.
 * x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/preview/2024-05-01-preview/examples/ContainerGroupsCreateOrUpdate.json
 */
async function containerGroupsCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERINSTANCE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERINSTANCE_RESOURCE_GROUP"] || "demo";
  const containerGroupName = "demo1";
  const containerGroup: ContainerGroup = {
    containers: [
      {
        name: "demo1",
        command: [],
        environmentVariables: [],
        image: "nginx",
        ports: [{ port: 80 }],
        resources: {
          requests: { cpu: 1, gpu: { count: 1, sku: "K80" }, memoryInGB: 1.5 },
        },
        volumeMounts: [
          { name: "volume1", mountPath: "/mnt/volume1", readOnly: false },
          { name: "volume2", mountPath: "/mnt/volume2", readOnly: false },
          { name: "volume3", mountPath: "/mnt/volume3", readOnly: true },
        ],
      },
    ],
    diagnostics: {
      logAnalytics: {
        logType: "ContainerInsights",
        metadata: { testKey: "test-metadata-value" },
        workspaceId: "workspaceid",
        workspaceKey: "workspaceKey",
        workspaceResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/rg/providers/microsoft.operationalinsights/workspaces/workspace",
      },
    },
    dnsConfig: {
      nameServers: ["1.1.1.1"],
      options: "ndots:2",
      searchDomains: "cluster.local svc.cluster.local",
    },
    identity: {
      type: "SystemAssigned, UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000000000000000000000000000/resourceGroups/myResourceGroup/providers/MicrosoftManagedIdentity/userAssignedIdentities/identityName":
          {},
      },
    },
    imageRegistryCredentials: [],
    ipAddress: {
      type: "Public",
      autoGeneratedDomainNameLabelScope: "Unsecure",
      dnsNameLabel: "dnsnamelabel1",
      ports: [{ port: 80, protocol: "TCP" }],
    },
    location: "west us",
    osType: "Linux",
    subnetIds: [
      {
        id: "[resourceId('Microsoft.Network/virtualNetworks/subnets', parameters('vnetName'), parameters('subnetName'))]",
      },
    ],
    volumes: [
      {
        name: "volume1",
        azureFile: {
          shareName: "shareName",
          storageAccountKey: "accountKey",
          storageAccountName: "accountName",
        },
      },
      { name: "volume2", emptyDir: {} },
      {
        name: "volume3",
        secret: {
          secretKey1: "SecretValue1InBase64",
          secretKey2: "SecretValue2InBase64",
        },
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containerGroups.beginCreateOrUpdateAndWait(
    resourceGroupName,
    containerGroupName,
    containerGroup,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or update container groups with specified configurations.
 *
 * @summary Create or update container groups with specified configurations.
 * x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/preview/2024-05-01-preview/examples/ContainerGroupsCreatePriority.json
 */
async function containerGroupsCreateWithPriority(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERINSTANCE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERINSTANCE_RESOURCE_GROUP"] || "demo";
  const containerGroupName = "demo1";
  const containerGroup: ContainerGroup = {
    containers: [
      {
        name: "test-container-001",
        command: ["/bin/sh", "-c", "sleep 10"],
        image: "alpine:latest",
        resources: { requests: { cpu: 1, memoryInGB: 1 } },
      },
    ],
    location: "eastus",
    osType: "Linux",
    priority: "Spot",
    restartPolicy: "Never",
    sku: "Standard",
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containerGroups.beginCreateOrUpdateAndWait(
    resourceGroupName,
    containerGroupName,
    containerGroup,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await confidentialContainerGroup();
  await containerGroupCreateOrUpdateWithStandbyPool();
  await containerGroupCreateWithExtensions();
  await containerGroupWithEncryptionProperties();
  await containerGroupsCreateOrUpdate();
  await containerGroupsCreateWithPriority();
}

main().catch(console.error);
