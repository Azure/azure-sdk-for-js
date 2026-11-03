// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a service-generated HorizonDB Cluster- or Pool-scoped Endpoint.
 *
 * @summary gets information about a service-generated HorizonDB Cluster- or Pool-scoped Endpoint.
 * x-ms-original-file: 2026-10-01-preview/Endpoints_Get.json
 */
async function getAHorizonDBEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.endpoints.get(
    "example-resource-group",
    "example-cluster",
    "example-cluster",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about a service-generated HorizonDB Cluster- or Pool-scoped Endpoint.
 *
 * @summary gets information about a service-generated HorizonDB Cluster- or Pool-scoped Endpoint.
 * x-ms-original-file: 2026-10-01-preview/Endpoints_GetReadOnly.json
 */
async function getAReadOnlyHorizonDBPoolEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.endpoints.get(
    "example-resource-group",
    "example-cluster",
    "example-pool-01",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAHorizonDBEndpoint();
  await getAReadOnlyHorizonDBPoolEndpoint();
}

main().catch(console.error);
