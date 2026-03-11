// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a specific private endpoint connection under a topic, domain, or partner namespace or namespace.
 *
 * @summary get a specific private endpoint connection under a topic, domain, or partner namespace or namespace.
 * x-ms-original-file: 2025-07-15-preview/PrivateEndpointConnections_Get.json
 */
async function privateEndpointConnectionsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "examplerg",
    "topics",
    "exampletopic1",
    "BMTPE5.8A30D251-4C61-489D-A1AA-B37C4A329B8B",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionsGet();
}

main().catch(console.error);
