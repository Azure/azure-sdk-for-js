// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDedicatedHSMResourceProvider } = require("@azure/arm-hardwaresecuritymodules");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the backup operation status of the specified Cloud HSM Cluster
 *
 * @summary gets the backup operation status of the specified Cloud HSM Cluster
 * x-ms-original-file: 2025-03-31/CloudHsmCluster_Backup_Pending_MaximumSet_Gen.json
 */
async function cloudHsmClusterGetBackupStatusMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  await client.cloudHsmClusterBackupStatus.get(
    "rgcloudhsm",
    "chsm1",
    "572a45927fc240e1ac075de27371680b",
  );
}

async function main() {
  await cloudHsmClusterGetBackupStatusMaximumSetGen();
}

main().catch(console.error);
