// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ElasticSanClient } = require("@azure/arm-elasticsan");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all Private Endpoint Connections associated with the Elastic San.
 *
 * @summary list all Private Endpoint Connections associated with the Elastic San.
 * x-ms-original-file: 2024-07-01-preview/PrivateEndpointConnections_List_MaximumSet_Gen.json
 */
async function privateEndpointConnectionsListMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanClient(credential, subscriptionId);
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
 * x-ms-original-file: 2024-07-01-preview/PrivateEndpointConnections_List_MinimumSet_Gen.json
 */
async function privateEndpointConnectionsListMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.list(
    "resourcegroupname",
    "elasticsanname",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await privateEndpointConnectionsListMaximumSetGen();
  await privateEndpointConnectionsListMinimumSetGen();
}

main().catch(console.error);
