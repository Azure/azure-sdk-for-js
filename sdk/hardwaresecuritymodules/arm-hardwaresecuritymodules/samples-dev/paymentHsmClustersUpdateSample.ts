// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDedicatedHSMResourceProvider } from "@azure/arm-hardwaresecuritymodules";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Payment HSM Cluster in the specified subscription.
 *
 * @summary update a Payment HSM Cluster in the specified subscription.
 * x-ms-original-file: 2025-12-01-preview/PaymentHsmCluster_Update_MaximumSet_Gen.json
 */
async function paymentHsmClusterUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const result = await client.paymentHsmClusters.update("rgpaymenthsm", "phsm1", {
    tags: { Dept: "hsm", Environment: "dogfood", Slice: "A" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await paymentHsmClusterUpdateMaximumSetGen();
}

main().catch(console.error);
