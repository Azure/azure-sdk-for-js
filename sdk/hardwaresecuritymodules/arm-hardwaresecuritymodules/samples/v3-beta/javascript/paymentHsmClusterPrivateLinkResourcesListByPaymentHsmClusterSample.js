// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDedicatedHSMResourceProvider } = require("@azure/arm-hardwaresecuritymodules");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private link resources supported for the Payment Hsm Cluster.
 *
 * @summary gets the private link resources supported for the Payment Hsm Cluster.
 * x-ms-original-file: 2025-12-01-preview/PaymentHsmClusterPrivateLinkResource_ListByPaymentHsmCluster_MaximumSet_Gen.json
 */
async function paymentHsmClusterPrivateLinkResourceListByPaymentHsmClusterMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.paymentHsmClusterPrivateLinkResources.listByPaymentHsmCluster(
    "rgpaymenthsm",
    "phsm1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await paymentHsmClusterPrivateLinkResourceListByPaymentHsmClusterMaximumSetGen();
}

main().catch(console.error);
