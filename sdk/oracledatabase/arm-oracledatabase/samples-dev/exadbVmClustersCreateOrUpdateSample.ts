// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a ExadbVmCluster
 *
 * @summary create a ExadbVmCluster
 * x-ms-original-file: 2025-09-01/ExadbVmClusters_CreateOrUpdate_MaximumSet_Gen.json
 */
async function exadbVmClustersCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.exadbVmClusters.createOrUpdate("rgopenapi", "vmcluster1", {
    properties: {
      ocid: "ocid1.autonomousdatabase.oc1..aaaaa3klq",
      clusterName: "p",
      backupSubnetCidr: "ca",
      lifecycleState: "Provisioning",
      vnetId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Microsoft.Network/virtualNetworks/vnet1",
      subnetId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
      dataCollectionOptions: {
        isDiagnosticsEventsEnabled: true,
        isHealthMonitoringEnabled: true,
        isIncidentLogsEnabled: true,
      },
      displayName:
        "zvnuzwcpevcsnhaheojscyiytcgxvtsuownoyrjddolqzpaalbyrgqgactzrafocjglzjzosrqewmsvdovubrczmlrjoahwgckbbhvimqfhmnrpuszndasfutdyyrvszdawdxvyfpgtoaemjvqpavsfsedbdhbqmqqtxxjthmjbswjbaymibfpbpzuy",
      domain: "akltvmctvumwfuqi",
      enabledEcpuCount: 0,
      exascaleDbStorageVaultId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/providers/Oracle.Database/exascaleDbStorageVaults/storageVaultName",
      gridImageOcid: "ocid1.autonomousdatabase.oc1..aaaaa3klq",
      gridImageType: "ReleaseUpdate",
      hostname: "uwrzwwhrr",
      licenseModel: "LicenseIncluded",
      nodeCount: 30,
      nsgCidrs: [{ source: "10.0.0.0/16", destinationPortRange: { min: 1520, max: 1522 } }],
      zoneOcid: "ocid1.autonomousdatabase.oc1..aaaaa3klq",
      privateZoneOcid: "ocid1.autonomousdatabase.oc1..aaaaa3klq",
      scanListenerPortTcp: 30,
      scanListenerPortTcpSsl: 14,
      shape: "pzfyfjznebdsakeira",
      sshPublicKeys: ["wzzayf"],
      systemVersion: "ssqzevdtjtcnxpdspcyqzgdtmonqjj",
      timeZone:
        "lkqvpvoczhoytxmeukzepgqgpdvdnigwxfojzfanqhracxsvgchwahzcifrkxlknixdrsopatguwccnejgyehnwfrvfedlefgneiudaqxbqnjkjedmcjocfvjdabwlyridcjvhzmlomgotwvnqqsrdjufsmebedckwwurmdoddknnfsm",
      totalEcpuCount: 10,
      vmFileSystemStorage: { totalSizeInGbs: 18 },
      scanDnsRecordId: "ocid1.autonomousdatabase.oc1..aaaaa3klq",
      snapshotFileSystemStorage: { totalSizeInGbs: 18 },
      totalFileSystemStorage: { totalSizeInGbs: 18 },
      iormConfigCache: {
        dbPlans: [{ dbName: "db1", flashCacheLimit: "none", share: 32 }],
        lifecycleDetails: "Disabled",
        lifecycleState: "Disabled",
        objective: "LowLatency",
      },
      backupSubnetOcid: "ocid1.autonomousdatabase.oc1..aaaaa3klq",
      subnetOcid: "ocid1.autonomousdatabase.oc1..aaaaa3klq",
    },
    zones: ["ozwhowofqaq"],
    tags: { key8577: "xkdpkp" },
    location: "dsmvbplxdvesmvsgdvorgxalwpqxwt",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a ExadbVmCluster
 *
 * @summary create a ExadbVmCluster
 * x-ms-original-file: 2025-09-01/ExadbVmClusters_CreateOrUpdate_MinimumSet_Gen.json
 */
async function exadbVmClustersCreateOrUpdateMaximumSetGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.exadbVmClusters.createOrUpdate("rgopenapi", "exadbVmClusterName1", {
    location: "eastus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await exadbVmClustersCreateOrUpdateMaximumSet();
  await exadbVmClustersCreateOrUpdateMaximumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
