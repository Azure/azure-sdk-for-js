// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all managed application resources created or in the process of being created in the Service Fabric cluster resource.
 *
 * @summary gets all managed application resources created or in the process of being created in the Service Fabric cluster resource.
 * x-ms-original-file: 2025-06-01-preview/ApplicationListOperation_example.json
 */
async function getAListOfApplicationResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.applications.list("resRg", "myCluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAListOfApplicationResources();
}

main().catch(console.error);
