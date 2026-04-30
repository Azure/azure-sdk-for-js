// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ElasticSanManagement } = require("@azure/arm-elasticsan");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified private endpoint connection associated with the Elastic San
 *
 * @summary deletes the specified private endpoint connection associated with the Elastic San
 * x-ms-original-file: 2025-09-01/PrivateEndpointConnections_Delete_MaximumSet_Gen.json
 */
async function privateEndpointConnectionsDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "resourcegroupname",
    "elasticsanname",
    "privateendpointconnectionname",
  );
}

/**
 * This sample demonstrates how to deletes the specified private endpoint connection associated with the Elastic San
 *
 * @summary deletes the specified private endpoint connection associated with the Elastic San
 * x-ms-original-file: 2025-09-01/PrivateEndpointConnections_Delete_MinimumSet_Gen.json
 */
async function privateEndpointConnectionsDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "resourcegroupname",
    "elasticsanname",
    "privateendpointconnectionname",
  );
}

async function main() {
  await privateEndpointConnectionsDeleteMaximumSetGen();
  await privateEndpointConnectionsDeleteMinimumSetGen();
}

main().catch(console.error);
