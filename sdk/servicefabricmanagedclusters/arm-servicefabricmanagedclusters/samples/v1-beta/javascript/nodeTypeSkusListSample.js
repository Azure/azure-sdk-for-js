// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Service Fabric node type supported SKUs.
 *
 * @summary get a Service Fabric node type supported SKUs.
 * x-ms-original-file: 2025-06-01-preview/NodeTypeSkusListOperation_example.json
 */
async function listANodeTypeSKUs() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.nodeTypeSkus.list("resRg", "myCluster", "BE")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listANodeTypeSKUs();
}

main().catch(console.error);
