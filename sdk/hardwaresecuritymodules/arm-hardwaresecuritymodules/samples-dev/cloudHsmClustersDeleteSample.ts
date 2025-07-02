// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDedicatedHSMResourceProvider } from "@azure/arm-hardwaresecuritymodules";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified Cloud HSM Cluster
 *
 * @summary deletes the specified Cloud HSM Cluster
 * x-ms-original-file: 2025-03-31/CloudHsmCluster_Delete_MaximumSet_Gen.json
 */
async function cloudHsmClusterDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  await client.cloudHsmClusters.delete("rgcloudhsm", "chsm1");
}

async function main(): Promise<void> {
  await cloudHsmClusterDeleteMaximumSetGen();
}

main().catch(console.error);
