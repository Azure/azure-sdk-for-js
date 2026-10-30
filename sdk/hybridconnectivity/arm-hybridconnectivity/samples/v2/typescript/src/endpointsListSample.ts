// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list of endpoints to the target resource.
 *
 * @summary list of endpoints to the target resource.
 * x-ms-original-file: 2027-01-01/Endpoints_List_MaximumSet_Gen.json
 */
async function hybridConnectivityEndpointsGetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const resArray = new Array();
  for await (const item of client.endpoints.list(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await hybridConnectivityEndpointsGetGeneratedByMaximumSetRule();
}

main().catch(console.error);
