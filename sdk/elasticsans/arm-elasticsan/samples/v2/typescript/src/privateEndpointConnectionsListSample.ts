// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all Private Endpoint Connections associated with the Elastic San.
 *
 * @summary list all Private Endpoint Connections associated with the Elastic San.
 * x-ms-original-file: 2025-09-01/PrivateEndpointConnections_List_MaximumSet_Gen.json
 */
async function privateEndpointConnectionsListMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.list(
    "resourcegroupname",
    "elasticsanname",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list all Private Endpoint Connections associated with the Elastic San.
 *
 * @summary list all Private Endpoint Connections associated with the Elastic San.
 * x-ms-original-file: 2025-09-01/PrivateEndpointConnections_List_MinimumSet_Gen.json
 */
async function privateEndpointConnectionsListMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.list(
    "resourcegroupname",
    "elasticsanname",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await privateEndpointConnectionsListMaximumSetGen();
  await privateEndpointConnectionsListMinimumSetGen();
}

main().catch(console.error);
