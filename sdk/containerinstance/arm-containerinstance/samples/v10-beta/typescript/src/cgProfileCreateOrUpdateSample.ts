// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a CGProfile if it doesn't exist or update an existing CGProfile.
 *
 * @summary create a CGProfile if it doesn't exist or update an existing CGProfile.
 * x-ms-original-file: 2026-06-01-preview/ContainerGroupProfileCreateOrUpdate_CreateConfidential.json
 */
async function confidentialContainerGroupProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.cgProfile.createOrUpdate("demo", "demo1", {
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
    zones: ["1"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a CGProfile if it doesn't exist or update an existing CGProfile.
 *
 * @summary create a CGProfile if it doesn't exist or update an existing CGProfile.
 * x-ms-original-file: 2026-06-01-preview/ContainerGroupProfileCreateOrUpdate_EncryptionProperties.json
 */
async function containerGroupProfileWithEncryptionProperties(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.cgProfile.createOrUpdate("demo", "demo1", {
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
    zones: ["1"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a CGProfile if it doesn't exist or update an existing CGProfile.
 *
 * @summary create a CGProfile if it doesn't exist or update an existing CGProfile.
 * x-ms-original-file: 2026-06-01-preview/ContainerGroupProfileCreateOrUpdate_Extensions.json
 */
async function containerGroupProfileCreateWithExtensions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.cgProfile.createOrUpdate("demo", "demo1", {
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
    zones: ["1"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a CGProfile if it doesn't exist or update an existing CGProfile.
 *
 * @summary create a CGProfile if it doesn't exist or update an existing CGProfile.
 * x-ms-original-file: 2026-06-01-preview/ContainerGroupProfilesCreateOrUpdate.json
 */
async function containerGroupProfilesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.cgProfile.createOrUpdate("demo", "demo1", {
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
        metadata: { "pod-uuid": "test-metadata-value" },
        workspaceId: "workspaceid",
        workspaceKey: "workspaceKey",
        workspaceResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/rg/providers/microsoft.operationalinsights/workspaces/workspace",
      },
    },
    imageRegistryCredentials: [],
    ipAddress: { type: "Public", ports: [{ port: 80, protocol: "TCP" }] },
    osType: "Linux",
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
    zones: ["1"],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await confidentialContainerGroupProfile();
  await containerGroupProfileWithEncryptionProperties();
  await containerGroupProfileCreateWithExtensions();
  await containerGroupProfilesCreateOrUpdate();
}

main().catch(console.error);
