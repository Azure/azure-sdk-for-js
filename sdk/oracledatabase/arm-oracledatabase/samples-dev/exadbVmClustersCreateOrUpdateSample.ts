// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a ExadbVmCluster
 *
 * @summary create a ExadbVmCluster
 * x-ms-original-file: 2026-06-01/ExadbVmClusters_CreateOrUpdate_MaximumSet_Gen.json
 */
async function exadbVmClustersCreateOrUpdateMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.exadbVmClusters.createOrUpdate("rgopenapi", "resource1", {
    properties: {
      clusterName: "lnmm",
      backupSubnetCidr: "example",
      vnetId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Microsoft.Network/virtualNetworks/vnet1",
      subnetId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
      dataCollectionOptions: {
        isDiagnosticsEventsEnabled: true,
        isHealthMonitoringEnabled: true,
        isIncidentLogsEnabled: true,
      },
      displayName: "resource1",
      domain: "tzc",
      enabledEcpuCount: 0,
      exascaleDbStorageVaultId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Oracle.Database/exascaleDbStorageVaults/vault1",
      gridImageOcid: "ocid1.autonomousdatabase.oc1..aaaaa3klq",
      hostnameV2: "resource1",
      licenseModel: "LicenseIncluded",
      nodeCount: 5,
      nsgCidrs: [{ source: "10.0.0.0/16", destinationPortRange: { min: 1520, max: 1522 } }],
      privateZoneOcid: "ocid1.autonomousdatabase.oc1..aaaaa3klq",
      scanListenerPortTcp: 29,
      scanListenerPortTcpSsl: 6,
      shape: "kwxhzzn",
      sshPublicKeys: ["ocw"],
      systemVersion: "example",
      timeZone: "2026-06-01T00:00:00Z",
      totalEcpuCount: 33,
      vmFileSystemStorage: { totalSizeInGbs: 27 },
      shapeAttribute: "SMART_STORAGE",
    },
    zones: ["uwwf"],
    tags: { key9568: "fwg" },
    location: "eastus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await exadbVmClustersCreateOrUpdateMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
