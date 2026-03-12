// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to gets the restore operation status of the specified Cloud HSM Cluster
 *
 * @summary gets the restore operation status of the specified Cloud HSM Cluster
 * x-ms-original-file: 2025-03-31/CloudHsmCluster_Restore_Pending_MaximumSet_Gen.json
 */

import { AzureDedicatedHSMResourceProvider } from "@azure/arm-hardwaresecuritymodules";
import { DefaultAzureCredential } from "@azure/identity";

async function cloudHsmClusterGetRestoreStatusMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  await client.cloudHsmClusterRestoreStatus.get(
    "rgcloudhsm",
    "chsm1",
    "572a45927fc240e1ac075de27371680b",
  );
}

async function main(): Promise<void> {
  await cloudHsmClusterGetRestoreStatusMaximumSetGen();
}

main().catch(console.error);
