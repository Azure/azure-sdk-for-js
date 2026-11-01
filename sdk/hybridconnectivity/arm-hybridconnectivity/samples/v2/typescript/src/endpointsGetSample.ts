// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the endpoint to the resource.
 *
 * @summary gets the endpoint to the resource.
 * x-ms-original-file: 2027-01-01/Endpoints_Get_MaximumSet_Gen.json
 */
async function hybridConnectivityEndpointsGetCustomGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.endpoints.get(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "dvibtlitlirlrljqjavewemmh",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the endpoint to the resource.
 *
 * @summary gets the endpoint to the resource.
 * x-ms-original-file: 2027-01-01/Endpoints_Get_MinimumSet_Gen.json
 */
async function hybridConnectivityEndpointsGetCustomGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.endpoints.get(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "mtmtfiytugklrzlgsbfllkffmpbit",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await hybridConnectivityEndpointsGetCustomGeneratedByMaximumSetRule();
  await hybridConnectivityEndpointsGetCustomGeneratedByMinimumSetRule();
}

main().catch(console.error);
