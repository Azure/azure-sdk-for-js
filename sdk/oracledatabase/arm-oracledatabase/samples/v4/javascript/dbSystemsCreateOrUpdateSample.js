// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a DbSystem
 *
 * @summary create a DbSystem
 * x-ms-original-file: 2026-06-01/DbSystems_CreateOrUpdate_MaximumSet_Gen.json
 */
async function dbSystemsCreateOrUpdateMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.dbSystems.createOrUpdate("rgopenapi", "resource1", {
    properties: {
      databaseEdition: "StandardEdition",
      adminPassword: "********",
      dbVersion: "example",
      pdbName: "resource1",
      source: "None",
      resourceAnchorId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Oracle.Database/resourceAnchors/anchor1",
      networkAnchorId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Oracle.Database/networkAnchors/networkanchor1",
      clusterName: "puw",
      displayName: "resource1",
      initialDataStorageSizeInGb: 40,
      dbSystemOptions: { storageManagement: "LVM" },
      diskRedundancy: "High",
      domainV2: "l",
      gridImageOcid: "ocid1.autonomousdatabase.oc1..aaaaa3klq",
      hostname: "b",
      ocid: "ocid1.autonomousdatabase.oc1..aaaaa3klq",
      licenseModelV2: "LicenseIncluded",
      lifecycleState: "Provisioning",
      nodeCount: 11,
      shape: "example",
      sshPublicKeys: ["example"],
      storageVolumePerformanceMode: "Balanced",
      timeZone: "2026-06-01T00:00:00Z",
      computeModel: "ECPU",
      computeCount: 10,
      dataCollectionOptions: {
        isDiagnosticsEventsEnabled: true,
        isHealthMonitoringEnabled: true,
        isIncidentLogsEnabled: true,
      },
      characterSet: "example",
      ncharacterSet: "fkdieg",
    },
    zones: ["example"],
    tags: { key1855: "hczjcgfrxqk" },
    location: "eastus",
  });
  console.log(result);
}

async function main() {
  await dbSystemsCreateOrUpdateMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
