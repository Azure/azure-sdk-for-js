// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all service resources created or in the process of being created in the Service Fabric managed application resource.
 *
 * @summary gets all service resources created or in the process of being created in the Service Fabric managed application resource.
 * x-ms-original-file: 2025-10-01-preview/ServiceListOperation_example.json
 */
async function getAListOfServiceResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.services.listByApplications("resRg", "myCluster", "myApp")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAListOfServiceResources();
}

main().catch(console.error);
