// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceFabricManagementClient } = require("@azure/arm-servicefabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a Service Fabric cluster resource with the specified name.
 *
 * @summary create or update a Service Fabric cluster resource with the specified name.
 * x-ms-original-file: 2026-03-01-preview/ClusterPutOperation_example_max.json
 */
async function putAClusterWithMaximumParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  const result = await client.clusters.createOrUpdate("resRg", "myCluster", {
    location: "eastus",
    addOnFeatures: [
      "RepairManager",
      "DnsService",
      "BackupRestoreService",
      "ResourceMonitorService",
    ],
    applicationTypeVersionsCleanupPolicy: { maxUnusedVersionsToKeep: 2 },
    azureActiveDirectory: {
      clientApplication: "d151ad89-4bce-4ae8-b3d1-1dc79679fa75",
      clusterApplication: "5886372e-7bf4-4878-a497-8098aba608ae",
      tenantId: "6abcc6a0-8666-43f1-87b8-172cf86a9f9c",
    },
    certificateCommonNames: {
      commonNames: [
        {
          certificateCommonName: "abc.com",
          certificateIssuerThumbprint: "12599211F8F14C90AFA9532AD79A6F2CA1C00622",
        },
      ],
      x509StoreName: "My",
    },
    clientCertificateCommonNames: [
      {
        certificateCommonName: "abc.com",
        certificateIssuerThumbprint: "5F3660C715EBBDA31DB1FFDCF508302348DE8E7A",
        isAdmin: true,
      },
    ],
    clientCertificateThumbprints: [
      { certificateThumbprint: "5F3660C715EBBDA31DB1FFDCF508302348DE8E7A", isAdmin: true },
    ],
    clusterCodeVersion: "7.0.470.9590",
    diagnosticsStorageAccountConfig: {
      blobEndpoint: "https://diag.blob.core.windows.net/",
      protectedAccountKeyName: "StorageAccountKey1",
      queueEndpoint: "https://diag.queue.core.windows.net/",
      storageAccountName: "diag",
      tableEndpoint: "https://diag.table.core.windows.net/",
    },
    enableHttpGatewayExclusiveAuthMode: true,
    eventStoreServiceEnabled: true,
    fabricSettings: [
      { name: "UpgradeService", parameters: [{ name: "AppPollIntervalInSeconds", value: "60" }] },
    ],
    infrastructureServiceManager: true,
    managementEndpoint: "https://myCluster.eastus.cloudapp.azure.com:19080",
    nodeTypes: [
      {
        name: "nt1vm",
        applicationPorts: { endPort: 30000, startPort: 20000 },
        clientConnectionEndpointPort: 19000,
        durabilityLevel: "Silver",
        ephemeralPorts: { endPort: 64000, startPort: 49000 },
        httpGatewayEndpointPort: 19007,
        httpGatewayTokenAuthEndpointPort: 19081,
        isPrimary: true,
        isStateless: false,
        multipleAvailabilityZones: true,
        vmInstanceCount: 5,
      },
    ],
    notifications: [
      {
        isEnabled: true,
        notificationCategory: "WaveProgress",
        notificationLevel: "Critical",
        notificationTargets: [
          {
            notificationChannel: "EmailUser",
            receivers: ["****@microsoft.com", "****@microsoft.com"],
          },
          { notificationChannel: "EmailSubscription", receivers: ["Owner", "AccountAdmin"] },
        ],
      },
      {
        isEnabled: true,
        notificationCategory: "WaveProgress",
        notificationLevel: "All",
        notificationTargets: [
          {
            notificationChannel: "EmailUser",
            receivers: ["****@microsoft.com", "****@microsoft.com"],
          },
          { notificationChannel: "EmailSubscription", receivers: ["Owner", "AccountAdmin"] },
        ],
      },
    ],
    reliabilityLevel: "Platinum",
    reverseProxyCertificateCommonNames: {
      commonNames: [
        {
          certificateCommonName: "abc.com",
          certificateIssuerThumbprint: "12599211F8F14C90AFA9532AD79A6F2CA1C00622",
        },
      ],
      x509StoreName: "My",
    },
    sfZonalUpgradeMode: "Hierarchical",
    upgradeDescription: {
      deltaHealthPolicy: {
        applicationDeltaHealthPolicies: {
          "fabric:/myApp1": {
            defaultServiceTypeDeltaHealthPolicy: { maxPercentDeltaUnhealthyServices: 0 },
            serviceTypeDeltaHealthPolicies: {
              myServiceType1: { maxPercentDeltaUnhealthyServices: 0 },
            },
          },
        },
        maxPercentDeltaUnhealthyApplications: 0,
        maxPercentDeltaUnhealthyNodes: 0,
        maxPercentUpgradeDomainDeltaUnhealthyNodes: 0,
      },
      forceRestart: false,
      healthCheckRetryTimeout: "00:05:00",
      healthCheckStableDuration: "00:00:30",
      healthCheckWaitDuration: "00:00:30",
      healthPolicy: {
        applicationHealthPolicies: {
          "fabric:/myApp1": {
            defaultServiceTypeHealthPolicy: { maxPercentUnhealthyServices: 0 },
            serviceTypeHealthPolicies: { myServiceType1: { maxPercentUnhealthyServices: 100 } },
          },
        },
        maxPercentUnhealthyApplications: 0,
        maxPercentUnhealthyNodes: 0,
      },
      upgradeDomainTimeout: "00:15:00",
      upgradeReplicaSetCheckTimeout: "00:10:00",
      upgradeTimeout: "01:00:00",
    },
    upgradeMode: "Manual",
    upgradePauseEndTimestampUtc: new Date("2021-06-25T22:00:00Z"),
    upgradePauseStartTimestampUtc: new Date("2021-06-21T22:00:00Z"),
    upgradeWave: "Wave1",
    vmImage: "Windows",
    vmssZonalUpgradeMode: "Parallel",
    tags: {},
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Service Fabric cluster resource with the specified name.
 *
 * @summary create or update a Service Fabric cluster resource with the specified name.
 * x-ms-original-file: 2026-03-01-preview/ClusterPutOperation_example_min.json
 */
async function putAClusterWithMinimumParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  const result = await client.clusters.createOrUpdate("resRg", "myCluster", {
    location: "eastus",
    diagnosticsStorageAccountConfig: {
      blobEndpoint: "https://diag.blob.core.windows.net/",
      protectedAccountKeyName: "StorageAccountKey1",
      queueEndpoint: "https://diag.queue.core.windows.net/",
      storageAccountName: "diag",
      tableEndpoint: "https://diag.table.core.windows.net/",
    },
    fabricSettings: [
      { name: "UpgradeService", parameters: [{ name: "AppPollIntervalInSeconds", value: "60" }] },
    ],
    managementEndpoint: "http://myCluster.eastus.cloudapp.azure.com:19080",
    nodeTypes: [
      {
        name: "nt1vm",
        applicationPorts: { endPort: 30000, startPort: 20000 },
        clientConnectionEndpointPort: 19000,
        durabilityLevel: "Bronze",
        ephemeralPorts: { endPort: 64000, startPort: 49000 },
        httpGatewayEndpointPort: 19007,
        isPrimary: true,
        vmInstanceCount: 5,
      },
    ],
    reliabilityLevel: "Silver",
    upgradeMode: "Automatic",
    tags: {},
  });
  console.log(result);
}

async function main() {
  await putAClusterWithMaximumParameters();
  await putAClusterWithMinimumParameters();
}

main().catch(console.error);
