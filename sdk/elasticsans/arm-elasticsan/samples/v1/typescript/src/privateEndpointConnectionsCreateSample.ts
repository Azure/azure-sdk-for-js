// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PrivateEndpointConnection} from "@azure/arm-elasticsan";
import {
  ElasticSanManagement,
} from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update the state of specified private endpoint connection associated with the Elastic San
 *
 * @summary Update the state of specified private endpoint connection associated with the Elastic San
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/ElasticSan/stable/2025-09-01/examples/PrivateEndpointConnections_Create_MaximumSet_Gen.json
 */
async function privateEndpointConnectionsCreateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName =
    process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const privateEndpointConnectionName = "privateendpointconnectionname";
  const parameters: PrivateEndpointConnection = {
    properties: {
      groupIds: ["jdwrzpemdjrpiwzvy"],
      privateEndpoint: {},
      privateLinkServiceConnectionState: {
        description: "dxl",
        actionsRequired: "jhjdpwvyzipggtn",
        status: "Pending",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.privateEndpointConnections.beginCreateAndWait(
    resourceGroupName,
    elasticSanName,
    privateEndpointConnectionName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Update the state of specified private endpoint connection associated with the Elastic San
 *
 * @summary Update the state of specified private endpoint connection associated with the Elastic San
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/ElasticSan/stable/2025-09-01/examples/PrivateEndpointConnections_Create_MinimumSet_Gen.json
 */
async function privateEndpointConnectionsCreateMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName =
    process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const privateEndpointConnectionName = "privateendpointconnectionname";
  const parameters: PrivateEndpointConnection = {
    properties: { privateLinkServiceConnectionState: {} },
  };
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.privateEndpointConnections.beginCreateAndWait(
    resourceGroupName,
    elasticSanName,
    privateEndpointConnectionName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionsCreateMaximumSetGen();
  await privateEndpointConnectionsCreateMinimumSetGen();
}

main().catch(console.error);
