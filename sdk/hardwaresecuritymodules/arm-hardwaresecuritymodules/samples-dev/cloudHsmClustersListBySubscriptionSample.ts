// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDedicatedHSMResourceProvider } from "@azure/arm-hardwaresecuritymodules";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the List operation gets information about the Cloud HSM Clusters associated with the subscription.
 *
 * @summary the List operation gets information about the Cloud HSM Clusters associated with the subscription.
 * x-ms-original-file: 2025-03-31/CloudHsmCluster_ListBySubscription_MaximumSet_Gen.json
 */
async function cloudHsmClusterListBySubscriptionMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cloudHsmClusters.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await cloudHsmClusterListBySubscriptionMaximumSetGen();
}

main().catch(console.error);
