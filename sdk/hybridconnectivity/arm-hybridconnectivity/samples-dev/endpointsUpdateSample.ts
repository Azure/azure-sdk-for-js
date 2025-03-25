// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the endpoint to the target resource.
 *
 * @summary update the endpoint to the target resource.
 * x-ms-original-file: 2024-12-01/EndpointsPatchDefault.json
 */
async function hybridConnectivityEndpointsPatchDefault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const result = await client.endpoints.update(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await hybridConnectivityEndpointsPatchDefault();
}

main().catch(console.error);
