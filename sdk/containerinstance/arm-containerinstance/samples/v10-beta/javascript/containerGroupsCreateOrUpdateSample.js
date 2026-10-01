// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update container groups with specified configurations.
 *
 * @summary create or update container groups with specified configurations.
 * x-ms-original-file: 2026-06-01-preview/ContainerGroupCreateConfidential.json
 */
async function confidentialContainerGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containerGroups.createOrUpdate("demo", "demo1", {
    location: "westeurope",
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
        securityContext: { capabilities: { add: ["CAP_NET_ADMIN"] }, privileged: false },
      },
    ],
    imageRegistryCredentials: [],
    ipAddress: { type: "Public", ports: [{ port: 8000, protocol: "TCP" }] },
    osType: "Linux",
    sku: "Confidential",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update container groups with specified configurations.
 *
 * @summary create or update container groups with specified configurations.
 * x-ms-original-file: 2026-06-01-preview/ContainerGroupCreateOrUpdateStandbyPool.json
 */
async function containerGroupCreateOrUpdateWithStandbyPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containerGroups.createOrUpdate("demo", "demo1", {
    location: "west us",
    containerGroupProfile: {
      id: "/subscriptions/subid/resourceGroups/demo/providers/Microsoft.ContainerInstance/containerGroupProfiles/democgp",
      revision: 1,
    },
    containers: [{ name: "demo1", configMap: { keyValuePairs: { Newkey: "value" } } }],
    standbyPoolProfile: {
      id: "/subscriptions/subid/resourceGroups/demo/providers/Microsoft.StandbyPool/standbyContainerGroupPools/demopool",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update container groups with specified configurations.
 *
 * @summary create or update container groups with specified configurations.
 * x-ms-original-file: 2026-06-01-preview/ContainerGroupEncryptionProperties.json
 */
async function containerGroupWithEncryptionProperties() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containerGroups.createOrUpdate("demo", "demo1", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/test-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/container-group-identity":
          {},
      },
    },
    location: "eastus2",
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
    imageRegistryCredentials: [],
    ipAddress: { type: "Public", ports: [{ port: 80, protocol: "TCP" }] },
    osType: "Linux",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update container groups with specified configurations.
 *
 * @summary create or update container groups with specified configurations.
 * x-ms-original-file: 2026-06-01-preview/ContainerGroupExtensions.json
 */
async function containerGroupCreateWithExtensions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containerGroups.createOrUpdate("demo", "demo1", {
    location: "eastus2",
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
      { name: "vk-realtime-metrics", extensionType: "realtime-metrics", version: "1.0" },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update container groups with specified configurations.
 *
 * @summary create or update container groups with specified configurations.
 * x-ms-original-file: 2026-06-01-preview/ContainerGroupsCreateOrUpdate.json
 */
async function containerGroupsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containerGroups.createOrUpdate("demo", "demo1", {
    identity: {
      type: "SystemAssigned, UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity-name":
          {},
      },
    },
    location: "west us",
    containers: [
      {
        name: "demo1",
        command: [],
        environmentVariables: [],
        image: "nginx",
        ports: [{ port: 80 }],
        resources: { requests: { cpu: 1, gpu: { count: 1, sku: "K80" }, memoryInGB: 1.5 } },
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
        metadata: { "test-key": "test-metadata-value" },
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
    imageRegistryCredentials: [],
    ipAddress: {
      type: "Public",
      autoGeneratedDomainNameLabelScope: "Unsecure",
      dnsNameLabel: "dnsnamelabel1",
      ports: [{ port: 80, protocol: "TCP" }],
    },
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
        secret: { secretKey1: "SecretValue1InBase64", secretKey2: "SecretValue2InBase64" },
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update container groups with specified configurations.
 *
 * @summary create or update container groups with specified configurations.
 * x-ms-original-file: 2026-06-01-preview/ContainerGroupsCreateOrUpdateSecretReference.json
 */
async function containerGroupsCreateOrUpdateSecretReference() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containerGroups.createOrUpdate("demo", "demo1", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity-name":
          {},
      },
    },
    location: "west us",
    containers: [
      {
        name: "demo1",
        command: [],
        environmentVariables: [{ name: "envSecret", secureValueReference: "envSecretRef" }],
        image: "privateRegistryImage",
        ports: [{ port: 80 }],
        resources: { requests: { cpu: 1, gpu: { count: 1, sku: "K80" }, memoryInGB: 1.5 } },
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
        metadata: { "test-key": "test-metadata-value" },
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
    imageRegistryCredentials: [
      {
        passwordReference: "privateRegistryKeyRef",
        server: "demoregistry.azurecr.io",
        username: "registryUserName",
      },
    ],
    ipAddress: {
      type: "Public",
      autoGeneratedDomainNameLabelScope: "Unsecure",
      dnsNameLabel: "dnsnamelabel1",
      ports: [{ port: 80, protocol: "TCP" }],
    },
    osType: "Linux",
    secretReferences: [
      {
        name: "envSecretRef",
        identity:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity-name",
        secretReferenceUri: "https://keyvaultname.vault.azure.net/secrets/envSecret",
      },
      {
        name: "accountKeyRef",
        identity:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity-name",
        secretReferenceUri: "https://keyvaultname.vault.azure.net/secrets/accountKey",
      },
      {
        name: "volumeSecretRef",
        identity:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity-name",
        secretReferenceUri: "https://keyvaultname.vault.azure.net/secrets/volumeSecret",
      },
      {
        name: "privateRegistryKeyRef",
        identity:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity-name",
        secretReferenceUri: "https://keyvaultname.vault.azure.net/secrets/privateRegistryKey",
      },
    ],
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
          storageAccountKeyReference: "accountKeyRef",
          storageAccountName: "accountName",
        },
      },
      { name: "volume2", emptyDir: {} },
      {
        name: "volume3",
        secret: { secretKey1: "SecretValue1InBase64" },
        secretReference: { secretKey2: "volumeSecretRef" },
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update container groups with specified configurations.
 *
 * @summary create or update container groups with specified configurations.
 * x-ms-original-file: 2026-06-01-preview/ContainerGroupsCreatePriority.json
 */
async function containerGroupsCreateWithPriority() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containerGroups.createOrUpdate("demo", "demo1", {
    location: "eastus",
    containers: [
      {
        name: "test-container-001",
        command: ["/bin/sh", "-c", "sleep 10"],
        image: "alpine:latest",
        resources: { requests: { cpu: 1, memoryInGB: 1 } },
      },
    ],
    osType: "Linux",
    priority: "Spot",
    restartPolicy: "Never",
    sku: "Standard",
  });
  console.log(result);
}

async function main() {
  await confidentialContainerGroup();
  await containerGroupCreateOrUpdateWithStandbyPool();
  await containerGroupWithEncryptionProperties();
  await containerGroupCreateWithExtensions();
  await containerGroupsCreateOrUpdate();
  await containerGroupsCreateOrUpdateSecretReference();
  await containerGroupsCreateWithPriority();
}

main().catch(console.error);
