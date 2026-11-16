// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDedicatedHSMResourceProvider } from "@azure/arm-hardwaresecuritymodules";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the private endpoint connection for the Payment Hsm Cluster.
 *
 * @summary gets the private endpoint connection for the Payment Hsm Cluster.
 * x-ms-original-file: 2025-12-01-preview/PaymentHsmClusterPrivateEndpointConnection_Get_MaximumSet_Gen.json
 */
async function paymentHsmClusterPrivateEndpointConnectionGetMaximumSetGen(): Promise<void> {
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

async function main(): Promise<void> {
  await paymentHsmClusterPrivateEndpointConnectionGetMaximumSetGen();
}

main().catch(console.error);
