// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ElasticSanClient } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified private endpoint connection associated with the Elastic San
 *
 * @summary gets the specified private endpoint connection associated with the Elastic San
 * x-ms-original-file: 2024-07-01-preview/PrivateEndpointConnections_Get_MaximumSet_Gen.json
 */
async function privateEndpointConnectionsGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "resourcegroupname",
    "elasticsanname",
    "privateendpointconnectionname",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified private endpoint connection associated with the Elastic San
 *
 * @summary gets the specified private endpoint connection associated with the Elastic San
 * x-ms-original-file: 2024-07-01-preview/PrivateEndpointConnections_Get_MinimumSet_Gen.json
 */
async function privateEndpointConnectionsGetMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "resourcegroupname",
    "elasticsanname",
    "privateendpointconnectionname",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionsGetMaximumSetGen();
  await privateEndpointConnectionsGetMinimumSetGen();
}

main().catch(console.error);
