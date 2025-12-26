// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a CloudVmCluster
 *
 * @summary update a CloudVmCluster
 * x-ms-original-file: 2025-09-01/CloudVmClusters_Update_MaximumSet_Gen.json
 */
async function patchVMClusterGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudVmClusters.update("rgopenapi", "cloudvmcluster1", {
    tags: { key4668: "gtrpgiq" },
    properties: {
      storageSizeInGbs: 17,
      fileSystemConfigurationDetails: [{ mountPoint: "gukfhjlmkqfqdgb", fileSystemSizeGb: 20 }],
      dataStorageSizeInTbs: 29,
      dbNodeStorageSizeInGbs: 24,
      memorySizeInGbs: 9,
      cpuCoreCount: 18,
      ocpuCount: 7,
      sshPublicKeys: ["hazhcc"],
      licenseModel: "LicenseIncluded",
      dataCollectionOptions: {
        isDiagnosticsEventsEnabled: true,
        isHealthMonitoringEnabled: true,
        isIncidentLogsEnabled: true,
      },
      displayName: "hvdyewkjqjxwzinkqnnsqxbmccteohzumz",
      computeNodes: ["ggficcnjgibtuqgdbbrzyckmtlhddecfcvjurboqfufqchgpvwmlcdcyyxnjivpkvsvr"],
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a CloudVmCluster
 *
 * @summary update a CloudVmCluster
 * x-ms-original-file: 2025-09-01/CloudVmClusters_Update_MinimumSet_Gen.json
 */
async function patchVMClusterGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudVmClusters.update("rgopenapi", "cloudvmcluster1", {});
  console.log(result);
}

/**
 * This sample demonstrates how to update a CloudVmCluster
 *
 * @summary update a CloudVmCluster
 * x-ms-original-file: 2025-09-01/vmClusters_patch.json
 */
async function cloudVmClustersUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudVmClusters.update("rg000", "cluster1", {});
  console.log(result);
}

async function main() {
  await patchVMClusterGeneratedByMaximumSetRule();
  await patchVMClusterGeneratedByMinimumSetRule();
  await cloudVmClustersUpdate();
}

main().catch(console.error);
