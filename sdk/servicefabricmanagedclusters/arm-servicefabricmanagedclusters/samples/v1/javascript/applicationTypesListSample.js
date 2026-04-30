// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all application type name resources created or in the process of being created in the Service Fabric managed cluster resource.
 *
 * @summary gets all application type name resources created or in the process of being created in the Service Fabric managed cluster resource.
 * x-ms-original-file: 2026-02-01/ApplicationTypeNameListOperation_example.json
 */
async function getAListOfApplicationTypeNameResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.applicationTypes.list("resRg", "myCluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAListOfApplicationTypeNameResources();
}

main().catch(console.error);
