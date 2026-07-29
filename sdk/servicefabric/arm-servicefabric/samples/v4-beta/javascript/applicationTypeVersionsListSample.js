// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceFabricManagementClient } = require("@azure/arm-servicefabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all application type version resources created or in the process of being created in the Service Fabric application type name resource.
 *
 * @summary gets all application type version resources created or in the process of being created in the Service Fabric application type name resource.
 * x-ms-original-file: 2026-03-01-preview/ApplicationTypeVersionListOperation_example.json
 */
async function getAListOfApplicationTypeVersionResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.applicationTypeVersions.list("resRg", "myCluster", "myAppType")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAListOfApplicationTypeVersionResources();
}

main().catch(console.error);
