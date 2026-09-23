// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDedicatedHSMResourceProvider } from "@azure/arm-hardwaresecuritymodules";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates the private endpoint connection for the Payment Hsm Cluster.
 *
 * @summary creates or updates the private endpoint connection for the Payment Hsm Cluster.
 * x-ms-original-file: 2025-12-01-preview/PaymentHsmClusterPrivateEndpointConnection_Create_MaximumSet_Gen.json
 */
async function paymentHsmClusterPrivateEndpointConnectionCreateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const result = await client.paymentHsmClusterPrivateEndpointConnections.create(
    "rgpaymenthsm",
    "phsm1",
    "sample-pec",
    {
      properties: {
        privateLinkServiceConnectionState: {
          description: "My name is Joe and I am approving this.",
          status: "Approved",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await paymentHsmClusterPrivateEndpointConnectionCreateMaximumSetGen();
}

main().catch(console.error);
