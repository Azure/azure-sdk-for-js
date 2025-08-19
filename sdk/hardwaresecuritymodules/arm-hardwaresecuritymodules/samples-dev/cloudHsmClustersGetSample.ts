// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDedicatedHSMResourceProvider } from "@azure/arm-hardwaresecuritymodules";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified Cloud HSM Cluster
 *
 * @summary gets the specified Cloud HSM Cluster
 * x-ms-original-file: 2025-03-31/CloudHsmCluster_Get_MaximumSet_Gen.json
 */
async function cloudHsmClusterGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(
    credential,
    subscriptionId,
  );
  const result = await client.cloudHsmClusters.get("rgcloudhsm", "chsm1");
  console.log(result);
}

async function main(): Promise<void> {
  await cloudHsmClusterGetMaximumSetGen();
}

main().catch(console.error);
