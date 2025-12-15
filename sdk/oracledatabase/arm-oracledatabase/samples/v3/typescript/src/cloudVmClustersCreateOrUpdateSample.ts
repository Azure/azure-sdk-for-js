// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a CloudVmCluster
 *
 * @summary create a CloudVmCluster
 * x-ms-original-file: 2025-09-01/CloudVmClusters_CreateOrUpdate_MaximumSet_Gen.json
 */
async function createVMClusterGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudVmClusters.createOrUpdate("rgopenapi", "cloudvmcluster1", {
    properties: {
      dataStorageSizeInTbs: 1000,
      dbNodeStorageSizeInGbs: 1000,
      memorySizeInGbs: 1000,
      timeZone: "UTC",
      hostname: "hostname1",
      domain: "domain1",
      cpuCoreCount: 2,
      ocpuCount: 3,
      clusterName: "cluster1",
      dataStoragePercentage: 100,
      isLocalBackupEnabled: true,
      cloudExadataInfrastructureId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Oracle.Database/cloudExadataInfrastructures/infra1",
      isSparseDiskgroupEnabled: true,
      sshPublicKeys: ["ssh-key 1"],
      nsgCidrs: [
        { source: "10.0.0.0/16", destinationPortRange: { min: 1520, max: 1522 } },
        { source: "10.10.0.0/24", destinationPortRange: { min: 9434, max: 11996 } },
      ],
      licenseModel: "LicenseIncluded",
      scanListenerPortTcp: 1050,
      scanListenerPortTcpSsl: 1025,
      vnetId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Microsoft.Network/virtualNetworks/vnet1",
      giVersion: "19.0.0.0",
      subnetId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
      backupSubnetCidr: "172.17.5.0/24",
      dataCollectionOptions: {
        isDiagnosticsEventsEnabled: true,
        isHealthMonitoringEnabled: true,
        isIncidentLogsEnabled: true,
      },
      displayName: "cluster 1",
      dbServers: ["ocid1..aaaa"],
      ocid: "ocid1..aaaa",
      storageSizeInGbs: 1000,
      fileSystemConfigurationDetails: [{ mountPoint: "gukfhjlmkqfqdgb", fileSystemSizeGb: 20 }],
      zoneId: "ocid1..aaaa",
      systemVersion: "v1",
      diskRedundancy: "High",
      scanDnsRecordId: "scandns1",
      lifecycleState: "Provisioning",
      computeNodes: ["ggficcnjgibtuqgdbbrzyckmtlhddecfcvjurboqfufqchgpvwmlcdcyyxnjivpkvsvr"],
      iormConfigCache: {
        dbPlans: [{ dbName: "db1", flashCacheLimit: "none", share: 32 }],
        lifecycleDetails: "Disabled",
        lifecycleState: "Disabled",
        objective: "LowLatency",
      },
      lastUpdateHistoryEntryId: "none",
      compartmentId: "ocid1..aaaaaa",
      subnetOcid: "ocid1..aaaaaa",
      computeModel: "ECPU",
    },
    location: "eastus",
    tags: {},
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a CloudVmCluster
 *
 * @summary create a CloudVmCluster
 * x-ms-original-file: 2025-09-01/CloudVmClusters_CreateOrUpdate_MinimumSet_Gen.json
 */
async function createVMClusterGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudVmClusters.createOrUpdate("rgopenapi", "cloudvmcluster1", {
    location: "eastus",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a CloudVmCluster
 *
 * @summary create a CloudVmCluster
 * x-ms-original-file: 2025-09-01/vmClusters_create.json
 */
async function cloudVmClustersCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudVmClusters.createOrUpdate("rg000", "cluster1", {
    properties: {
      dataStorageSizeInTbs: 1000,
      dbNodeStorageSizeInGbs: 1000,
      memorySizeInGbs: 1000,
      timeZone: "UTC",
      hostname: "hostname1",
      domain: "domain1",
      cpuCoreCount: 2,
      ocpuCount: 3,
      clusterName: "cluster1",
      dataStoragePercentage: 100,
      isLocalBackupEnabled: false,
      cloudExadataInfrastructureId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Oracle.Database/cloudExadataInfrastructures/infra1",
      isSparseDiskgroupEnabled: false,
      sshPublicKeys: ["ssh-key 1"],
      nsgCidrs: [
        { source: "10.0.0.0/16", destinationPortRange: { min: 1520, max: 1522 } },
        { source: "10.10.0.0/24" },
      ],
      licenseModel: "LicenseIncluded",
      scanListenerPortTcp: 1050,
      scanListenerPortTcpSsl: 1025,
      vnetId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Microsoft.Network/virtualNetworks/vnet1",
      giVersion: "19.0.0.0",
      subnetId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
      backupSubnetCidr: "172.17.5.0/24",
      dataCollectionOptions: {
        isDiagnosticsEventsEnabled: false,
        isHealthMonitoringEnabled: false,
        isIncidentLogsEnabled: false,
      },
      displayName: "cluster 1",
      dbServers: ["ocid1..aaaa"],
    },
    location: "eastus",
    tags: { tagK1: "tagV1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createVMClusterGeneratedByMaximumSetRule();
  await createVMClusterGeneratedByMinimumSetRule();
  await cloudVmClustersCreateOrUpdate();
}

main().catch(console.error);
