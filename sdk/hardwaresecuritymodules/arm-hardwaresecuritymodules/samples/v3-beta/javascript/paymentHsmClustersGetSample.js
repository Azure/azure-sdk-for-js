// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDedicatedHSMResourceProvider } = require("@azure/arm-hardwaresecuritymodules");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified Payment HSM Cluster
 *
 * @summary gets the specified Payment HSM Cluster
 * x-ms-original-file: 2025-12-01-preview/PaymentHsmCluster_Get_MaximumSet_Gen.json
 */
async function paymentHsmClusterGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const result = await client.paymentHsmClusters.get("rgpaymenthsm", "phsm1");
  console.log(result);
}

async function main() {
  await paymentHsmClusterGetMaximumSetGen();
}

main().catch(console.error);
