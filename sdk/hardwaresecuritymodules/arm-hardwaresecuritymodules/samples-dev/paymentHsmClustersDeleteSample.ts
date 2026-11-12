// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDedicatedHSMResourceProvider } from "@azure/arm-hardwaresecuritymodules";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified Payment HSM Cluster
 *
 * @summary deletes the specified Payment HSM Cluster
 * x-ms-original-file: 2025-12-01-preview/PaymentHsmCluster_Delete_MaximumSet_Gen.json
 */
async function paymentHsmClusterDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  await client.paymentHsmClusters.delete("rgpaymenthsm", "phsm1");
}

async function main(): Promise<void> {
  await paymentHsmClusterDeleteMaximumSetGen();
}

main().catch(console.error);
