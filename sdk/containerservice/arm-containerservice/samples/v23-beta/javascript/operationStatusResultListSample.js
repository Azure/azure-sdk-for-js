// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a list of operations in the specified managedCluster
 *
 * @summary Gets a list of operations in the specified managedCluster
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-07-02-preview/examples/OperationStatusResultList.json
 */
async function listOfOperationStatusResult() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operationStatusResultOperations.list(
    resourceGroupName,
    resourceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listOfOperationStatusResult();
}

main().catch(console.error);
