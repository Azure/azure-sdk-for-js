// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDedicatedHSMResourceProvider } from "@azure/arm-hardwaresecuritymodules";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the List operation gets information about the private endpoint connections associated with the Payment HSM Cluster
 *
 * @summary the List operation gets information about the private endpoint connections associated with the Payment HSM Cluster
 * x-ms-original-file: 2025-12-01-preview/PaymentHsmClusterPrivateEndpointConnection_ListByPaymentHsmCluster_MaximumSet_Gen.json
 */
async function paymentHsmClusterPrivateEndpointConnectionListByPaymentHsmClusterMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.paymentHsmClusterPrivateEndpointConnections.listByPaymentHsmCluster(
    "rgpaymenthsm",
    "phsm1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await paymentHsmClusterPrivateEndpointConnectionListByPaymentHsmClusterMaximumSetGen();
}

main().catch(console.error);
