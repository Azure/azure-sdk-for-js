// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDedicatedHSMResourceProvider } = require("@azure/arm-hardwaresecuritymodules");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private endpoint connection for the Payment Hsm Cluster.
 *
 * @summary gets the private endpoint connection for the Payment Hsm Cluster.
 * x-ms-original-file: 2025-12-01-preview/PaymentHsmClusterPrivateEndpointConnection_Get_MaximumSet_Gen.json
 */
async function paymentHsmClusterPrivateEndpointConnectionGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const result = await client.paymentHsmClusterPrivateEndpointConnections.get(
    "rgpaymenthsm",
    "phsm1",
    "sample-pec",
  );
  console.log(result);
}

async function main() {
  await paymentHsmClusterPrivateEndpointConnectionGetMaximumSetGen();
}

main().catch(console.error);
