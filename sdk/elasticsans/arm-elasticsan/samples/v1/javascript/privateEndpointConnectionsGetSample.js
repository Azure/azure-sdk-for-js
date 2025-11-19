// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ElasticSanManagement } = require("@azure/arm-elasticsan");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the specified private endpoint connection associated with the Elastic San
 *
 * @summary Gets the specified private endpoint connection associated with the Elastic San
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/ElasticSan/stable/2025-09-01/examples/PrivateEndpointConnections_Get_MaximumSet_Gen.json
 */
async function privateEndpointConnectionsGetMaximumSetGen() {
  const subscriptionId = process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName = process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const privateEndpointConnectionName = "privateendpointconnectionname";
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    resourceGroupName,
    elasticSanName,
    privateEndpointConnectionName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the specified private endpoint connection associated with the Elastic San
 *
 * @summary Gets the specified private endpoint connection associated with the Elastic San
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/ElasticSan/stable/2025-09-01/examples/PrivateEndpointConnections_Get_MinimumSet_Gen.json
 */
async function privateEndpointConnectionsGetMinimumSetGen() {
  const subscriptionId = process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName = process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const privateEndpointConnectionName = "privateendpointconnectionname";
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    resourceGroupName,
    elasticSanName,
    privateEndpointConnectionName,
  );
  console.log(result);
}

async function main() {
  await privateEndpointConnectionsGetMaximumSetGen();
  await privateEndpointConnectionsGetMinimumSetGen();
}

main().catch(console.error);
