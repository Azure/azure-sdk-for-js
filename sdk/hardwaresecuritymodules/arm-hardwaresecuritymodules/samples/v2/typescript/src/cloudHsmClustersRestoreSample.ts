// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDedicatedHSMResourceProvider } from "@azure/arm-hardwaresecuritymodules";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to restores all key materials of a specified Cloud HSM Cluster
 *
 * @summary restores all key materials of a specified Cloud HSM Cluster
 * x-ms-original-file: 2025-03-31/CloudHsmCluster_RequestOrValidate_Restore_MaximumSet_Gen.json
 */
async function cloudHsmClusterRestoreMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const result = await client.cloudHsmClusters.restore("rgcloudhsm", "chsm1", {
    azureStorageBlobContainerUri:
      "https://myaccount.blob.core.windows.net/sascontainer/sasContainer",
    backupId: "backupId",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await cloudHsmClusterRestoreMaximumSetGen();
}

main().catch(console.error);
